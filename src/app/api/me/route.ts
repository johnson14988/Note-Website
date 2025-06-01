import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value

        if (!token) {
            return NextResponse.json({ loggedIn: false })
        }

        const payload = jwt.verify(token, JWT_SECRET) as { username: string }

        // 从数据库查用户
        const user = await prisma.user.findUnique({
            where: { username: payload.username },
            select: { username: true }, // 只返回需要的信息
        })

        if (!user) {
            // 数据库不存在该用户，可能已被删除或禁用
            return NextResponse.json({ loggedIn: false })
        }

        return NextResponse.json({ loggedIn: true, username: user.username })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        return NextResponse.json({ loggedIn: false })
    }
}
