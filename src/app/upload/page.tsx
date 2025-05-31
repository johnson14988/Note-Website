'use client'

import { useState } from 'react'

export default function UploadPage() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        })

        if (res.ok) {
            setMessage('✅ 笔记已保存！')
            setTitle('')
            setContent('')
        } else {
            setMessage('❌ 笔记保存失败')
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">创建新笔记</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="标题"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    placeholder="内容（支持 Markdown）"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    className="w-full border p-2 rounded"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    提交
                </button>
                {message && <p className="mt-2">{message}</p>}
            </form>
        </div>
    )
}
