import fs from 'fs'
import React from "react"
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import DeleteNoteForm from '../../../components/deleteNoteForm'

export default function NotePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params)
    const filePath = path.join(process.cwd(), 'notes', `${slug}.md`)

    if (!fs.existsSync(filePath)) {
        notFound()
    }

    const content = fs.readFileSync(filePath, 'utf-8')
    const mdContent = content.replace(/^---[\s\S]*?---/, '').trim()

    return (
        <main style={{ padding: 20 }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {mdContent}
            </ReactMarkdown>

            <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
                <Link href="/" className="text-blue-600 hover:underline">← 返回列表</Link>
                <Link href={`/notes/${slug}/edit`} className="text-yellow-600 hover:underline">✏️ 编辑</Link>
                <DeleteNoteForm slug={slug} />
            </div>
        </main>
    )
}
