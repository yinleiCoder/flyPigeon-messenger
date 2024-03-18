import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prisma_db'

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser()
        const {
            name,
            image
        } = await request.json()
        if (!currentUser?.id) {
            return new NextResponse('请登录', { status: 401 })
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image: image,
                name: name,
            }
        })
        return NextResponse.json(updatedUser)
    } catch (error: any) {
        console.log(error, "ERROR_SETTINGS")
        return new NextResponse('修改用户资料失败', { status: 500 })
    }
}