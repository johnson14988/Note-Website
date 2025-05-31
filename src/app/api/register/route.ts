import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const usersFile = path.join(process.cwd(), 'users.json')

export async function POST(req: NextRequest) {
    const { username, password } = await req.json()

    if (!username || !password) {
        return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 })
    }

    try {
        let users: Record<string, string> = {}
        if (fs.existsSync(usersFile)) {
            const data = fs.readFileSync(usersFile, 'utf-8')
            users = JSON.parse(data)
        }

        if (users[username]) {
            return NextResponse.json({ error: '用户名已存在' }, { status: 409 })
        }

        // ✅ 加密密码
        const hashedPassword = await bcrypt.hash(password, 10)

        // ✅ 存储加密后的密码
        users[username] = hashedPassword

        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
        return NextResponse.json({ success: true })
    } catch (err: any) {
        console.error('注册失败:', err)
        return NextResponse.json({ error: '服务器错误' }, { status: 500 })
    }
}
