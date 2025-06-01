import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'  // 你的 prisma client

// 约定 slug = `${date}-${slugifiedTitle}`，这里用 title 组成的 slug，或你也可以用 id

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    const { slug } = params

    // 从 slug 解析出笔记标题（假设slug格式是 date-title）
    // 如果你存储了 slug 字段，也可以直接用 slug 查询，这里用 title 举例
    const title = slug.split('-').slice(1).join('-')

    const note = await prisma.note.findFirst({
        where: { title },
    })

    if (!note) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ content: note.content, title: note.title, createdAt: note.createdAt })
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
    const { slug } = params
    const { content } = await req.json()
    const title = slug.split('-').slice(1).join('-')

    const updatedNote = await prisma.note.updateMany({
        where: { title },
        data: { content },
    })

    if (updatedNote.count === 0) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Saved' })
}

export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
    const { slug } = params
    const title = slug.split('-').slice(1).join('-')

    const deletedNote = await prisma.note.deleteMany({
        where: { title },
    })

    if (deletedNote.count === 0) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Deleted' })
}
