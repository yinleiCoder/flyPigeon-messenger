import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prisma_db'
import { pusherServer } from '@/app/libs/pusher';

export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser()
        const {
            userId,
            isGroup,
            members,
            name// 群聊名
        } = await request.json()
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("请登录", { status: 401 })
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse("创建群聊失败", { status: 400 })
        }

        // 群聊
        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: {// populate
                    users: true
                }
            })

            newConversation.users.forEach((user) => {
                if (user.email) {
                    pusherServer.trigger(user.email, "conversation:new", newConversation)
                }
            })
            return NextResponse.json(newConversation)
        }

        // 私聊
        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]
            }
        })
        const singleConversation = existingConversations[0]
        if (singleConversation) {
            return NextResponse.json(singleConversation)
        }
        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id,
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true,
            }
        })

        newConversation.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, "conversation:new", newConversation)
            }
        })
        return NextResponse.json(newConversation)
    } catch (error: any) {
        return new NextResponse("服务器内部错误", { status: 500 })
    }
}

