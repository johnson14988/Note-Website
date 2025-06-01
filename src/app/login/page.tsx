'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUser } from '@/context/UserContext'

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectTo = searchParams.get('redirect') || '/'
    const { setUser } = useUser()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        const data = await res.json()

        if (res.ok && data.success) {
            setMessage('✅ 登录成功！')
            setUser({ username })
            router.push(redirectTo)
        } else {
            setMessage(`❌ 登录失败: ${data.error || '未知错误'}`)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-md bg-white">
            <h1 className="text-3xl font-bold mb-6 text-center">登录</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    type="text"
                    placeholder="用户名"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    登录
                </button>
            </form>
            {message && (
                <p className="mt-4 text-center text-sm text-red-600">
                    {message}
                </p>
            )}
        </div>
    )
}
