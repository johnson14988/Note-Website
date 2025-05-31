import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const usersFile = path.join(process.cwd(), 'users.json')
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key' // 生产环境请用环境变量

export async function POST(req: NextRequest) {
    const { username, password } = await req.json()

    if (!username || !password) {
        return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 })
    }

    try {
        if (!fs.existsSync(usersFile)) {
            return NextResponse.json({ error: '用户名或密码错误' }, { status: 404 })
        }

        const data = fs.readFileSync(usersFile, 'utf-8')
        const users: Record<string, string> = JSON.parse(data)

        const hashedPassword = users[username]

        if (!hashedPassword) {
            return NextResponse.json({ error: '用户名或密码错误' }, { status: 404 })
        }

        const isMatch = await bcrypt.compare(password, hashedPassword)
        if (!isMatch) {
            return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 })
        }

        // 生成 JWT
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' })

        // 设置 HttpOnly cookie
        const response = NextResponse.json({ success: true })
        response.cookies.set('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 天
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        })

        return response
    } catch (err) {
        console.error('登录失败:', err)
        return NextResponse.json({ error: '服务器错误' }, { status: 500 })
    }
}
