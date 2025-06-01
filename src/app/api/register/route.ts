import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

// 注意：保证 PrismaClient 实例在全局复用，避免连接泄漏（尤其开发时）
const prisma = global.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export async function POST(req: NextRequest) {
    const { username, password } = await req.json()

    if (!username || !password) {
        return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 })
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { username }
        })

        if (existingUser) {
            return NextResponse.json({ error: '用户名或密码错误' }, { status: 409 }) // 统一提示，防止碰撞攻击
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            }
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('注册失败:', err)
        return NextResponse.json({ error: '服务器错误' }, { status: 500 })
    }
}
