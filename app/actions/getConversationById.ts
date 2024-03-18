import prisma from '@/app/libs/prisma_db'
import getCurrentUser from './getCurrentUser'
import ConversationId from '../conversations/[conversationId]/page';

const getConversationById = async (conversationId: string) => {
    try {
        const currentUser = await getCurrentUser()
        if (!currentUser?.email) {
            return null;
        }
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })
        return conversation
    } catch (error: any) {
        return null
    }
}

export default getConversationById