// app/page.tsx
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface NoteMeta {
    slug: string
    title: string
    date: string
}

export default function Home() {
    const [notes, setNotes] = useState<NoteMeta[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/notes')  // 👈 改为从 API 获取数据
            .then(res => res.json())
            .then(data => setNotes(data.notes || []))
            .finally(() => setLoading(false))
    }, [])

    return (
        <main className="p-6">
            <p>This is a Next.js Site</p>

            <nav className="mt-6 mb-8">
                <Link
                    href="/upload"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
                >
                    ➕ 创建新笔记
                </Link>
            </nav>

            <section>
                <h2 className="text-2xl font-semibold mb-4">笔记列表</h2>
                {loading ? (
                    <p>加载中...</p>
                ) : notes.length === 0 ? (
                    <p>还没有笔记，快去创建一个吧！</p>
                ) : (
                    <ul>
                        {notes.map(note => (
                            <li key={note.slug} className="mb-3">
                                <Link
                                    href={`/notes/${note.slug}`}
                                    className="text-blue-700 hover:underline"
                                >
                                    {note.title}
                                </Link>
                                <br />
                                <small className="text-gray-500">{note.date}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    )
}
