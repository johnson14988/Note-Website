import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const notesDir = path.join(process.cwd(), 'notes')

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    const filePath = path.join(notesDir, `${params.slug}.md`)

    if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const content = fs.readFileSync(filePath, 'utf-8')
    return NextResponse.json({ content })
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
    const { content } = await req.json()
    const filePath = path.join(notesDir, `${params.slug}.md`)
    fs.writeFileSync(filePath, content, 'utf-8')
    return NextResponse.json({ message: 'Saved' })
}

export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
    const filePath = path.join(notesDir, `${params.slug}.md`)
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        return NextResponse.json({ message: 'Deleted' })
    } else {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
}
