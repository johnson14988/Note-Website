import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import DeleteNoteForm from '../../../components/deleteNoteForm'
import { prisma } from '@/lib/prisma'  // 注意这里，确保引入的是 prisma 客户端

interface NotePageProps {
    params: { slug: string }
}

export default async function NotePage({ params }: NotePageProps) {
    const { slug } = params
    console.log('slug:', slug)

    // 只取 title 部分
    const title = slug.split('-').slice(3).join('-')
    console.log('parsed title:', title)

    // 用 prisma 只根据 title 查询笔记
    const note = await prisma.note.findFirst({
        where: { title },
    })
    console.log('note:', note)

    if (!note) {
        notFound()
    }

    return (
        <main style={{ padding: 20 }}>
            <h1 className="text-3xl font-bold mb-6">{note.title}</h1>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {note.content}
            </ReactMarkdown>

            <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
                <Link href="/" className="text-blue-600 hover:underline">← 返回列表</Link>
                <Link href={`/notes/${slug}/edit`} className="text-yellow-600 hover:underline">✏️ 编辑</Link>
                <DeleteNoteForm slug={slug} />
            </div>
        </main>
    )
}
