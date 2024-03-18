import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prisma_db'

interface IParams {
    conversationId?: string;
}

export async function POST(request: Request, {
    params
}: { params: IParams }) {
    try {
        const currentUser = await getCurrentUser()
        const { conversationId } = params

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('请先登录', { status: 401 })
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true,
            }
        })

        if (!conversation) {
            return new NextResponse('无效的对话', { status: 400 })
        }

        const lastMessage = conversation.messages[conversation.messages.length - 1]
        if (!lastMessage) {
            return NextResponse.json(conversation)
        }

        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        })
        return NextResponse.json(updatedMessage)
    } catch (error: any) {
        console.log(error, "ERROR_MESSAGES_SEEN")
        return new NextResponse("服务器内部错误", { status: 500 })
    }
}