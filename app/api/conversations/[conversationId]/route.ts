import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prisma_db'

interface IParams {
    conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser()
        if (!currentUser?.id) {
            return new NextResponse('q请登录', { status: 401 })
        }
        
        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })
        if (!existingConversation) {
            return new NextResponse('无效的对话', { status: 400 })
        }
        
        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        })
        return NextResponse.json(deletedConversation)
    } catch (error: any) {
        console.log(error, "ERROR_CONVERSATION_DELETE")
        return new NextResponse('删除错误', { status: 500 })
    }
}