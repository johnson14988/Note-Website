import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import slugify from 'slugify'

export async function POST(req: NextRequest) {
    const { title, content } = await req.json()

    if (!title || !content) {
        return NextResponse.json({ error: '缺少标题或内容' }, { status: 400 })
    }

    const date = new Date().toISOString().split('T')[0]
    const slug = `${date}-${slugify(title, { lower: true, strict: true })}`
    const filePath = path.join(process.cwd(), 'notes', `${slug}.md`)

    const mdContent = `---
title: ${title}
date: ${date}
---

${content}
`

    try {
        // 确保目录存在
        const dirPath = path.join(process.cwd(), 'notes')
        if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)

        fs.writeFileSync(filePath, mdContent)
        return NextResponse.json({ success: true, slug })
    } catch (err) {
        console.error('写入失败:', err)
        return NextResponse.json({ error: '服务器写入失败' }, { status: 500 })
    }
}
