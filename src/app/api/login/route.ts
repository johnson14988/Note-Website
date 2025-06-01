import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(req: NextRequest) {
    const { username, password } = await req.json()

    if (!username || !password) {
        return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { username }
        })

        // 统一错误提示（防止用户名探测）
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 })
        }

        // ✅ 登录成功：生成 JWT
        const token = jwt.sign({ username: user.username }, JWT_SECRET, {
            expiresIn: '1h',
        })

        // ✅ 写 cookie
        const res = NextResponse.json({ success: true })
        res.cookies.set('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60, // 1小时
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        })

        return res
    } catch (err: unknown) {
        console.error('登录失败:', err)
        return NextResponse.json({ error: '服务器错误' }, { status: 500 })
    }
}
