// components/Header.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
    const [user, setUser] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/me')
            .then(res => res.json())
            .then(data => {
                if (data.loggedIn) setUser(data.username)
                else setUser(null)
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div>加载中...</div>

    return (
        <header className="flex justify-between items-center mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold">Welcome</h1>
            <div className="space-x-4">
                {user ? (
                    <>
                        <span>欢迎，{user}</span>
                        <Link
                            href="/logout"
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            退出登录
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            href="/register"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            注册
                        </Link>
                        <Link
                            href="/login"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            登录
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}
