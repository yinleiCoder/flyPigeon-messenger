import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prisma_db'

export async function POST(request: Request) {
    const body = await request.json()
    const {
        email,
        name,
        password
    } = body

    if (!email || !name || !password) {
        return new NextResponse('请填写全部的凭据信息，然后才会给宝子下发专属账号哦~', { status: 400 })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
        }
    })
    return NextResponse.json(user)
}