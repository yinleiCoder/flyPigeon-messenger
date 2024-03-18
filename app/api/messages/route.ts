import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prisma_db'

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser()
        const {
            message,
            image,
            conversationId
        } = await request.json()

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('请先登录', { status: 500 })
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                Conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                seen: true,
                sender: true,
            }
        })

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        })

        return NextResponse.json(newMessage)
    } catch (error: any) {
        console.log(error, "Error_MESSAGEs")
        return new NextResponse('服务器内部错误', { status: 500 })
    }
}