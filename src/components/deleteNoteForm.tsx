// components/DeleteNoteForm.tsx
'use client'

import { useRouter } from 'next/navigation'

export default function DeleteNoteForm({ slug }: { slug: string }) {
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!confirm("确定要删除这篇笔记吗？")) return

        const res = await fetch(`/api/notes/${slug}`, {
            method: 'DELETE',
        })

        if (res.ok) {
            router.push('/')
        } else {
            alert('删除失败')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit" className="text-red-600 hover:underline">🗑️ 删除</button>
        </form>
    )
}
