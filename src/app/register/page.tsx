'use client'

import React, { useState } from 'react'

export default function RegisterPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        const data = await res.json()
        if (res.ok) {
            setMessage('✅ 注册成功！')
            setUsername('')
            setPassword('')
        } else {
            setMessage(`❌ 注册失败：${data.error}`)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">注册</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    注册
                </button>
                {message && <p className="mt-2">{message}</p>}
            </form>
        </div>
    )
}
