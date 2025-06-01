import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    const { title, content, username } = await req.json()

    if (!title || !content || !username) {
        return NextResponse.json({ error: '缺少标题、内容或用户名' }, { status: 400 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { username },
        })

        if (!user) {
            return NextResponse.json({ error: '用户不存在' }, { status: 404 })
        }

        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId: user.id,
            },
        })

        return NextResponse.json({ success: true, note })
    } catch (error) {
        console.error('写入数据库失败:', error)
        return NextResponse.json({ error: '服务器错误' }, { status: 500 })
    }
}

// ✅ 添加这个 GET 方法用于主页展示笔记列表
export async function GET() {
    try {
        const notes = await prisma.note.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                title: true,
                createdAt: true,
            },
        })

        const formatted = notes.map((note: { createdAt: { toISOString: () => string }; title: string }) => ({
            slug: note.createdAt.toISOString().split('T')[0] + '-' + note.title,
            title: note.title,
            date: note.createdAt.toISOString().split('T')[0],
        }))

        return NextResponse.json({ notes: formatted })
    } catch (error) {
        console.error('获取笔记失败:', error)
        return NextResponse.json({ error: '服务器错误' }, { status: 500 })
    }
}
