'use client'

import React from "react"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditNotePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params)
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        fetch(`/api/notes/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setContent(data.content || '')
                setLoading(false)
            })
    }, [slug])

    const handleSave = async () => {
        const res = await fetch(`/api/notes/${slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        })

        if (res.ok) {
            alert('保存成功！')
            router.push(`/notes/${slug}`)
        } else {
            alert('保存失败')
        }
    }

    if (loading) return <p style={{ padding: 20 }}>加载中...</p>

    return (
        <main style={{ padding: 20 }}>
            <h1 className="text-xl font-bold mb-4">编辑笔记：{slug}</h1>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                style={{ width: '100%', fontFamily: 'monospace', padding: 10 }}
            />
            <div className="mt-4 flex gap-4">
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    💾 保存
                </button>
            </div>
        </main>
    )
}
