'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'

export default function Header() {
    const { user, setUser, loading } = useUser()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/logout', { method: 'POST' })
            if (res.ok) {
                setUser(null)
                router.push('/')
            } else {
                alert('退出登录失败')
            }
        } catch {
            alert('退出登录出错')
        }
    }

    if (loading) return <div>加载中...</div>

    return (
        <header className="flex justify-between items-center mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold">Welcome</h1>
            <div className="space-x-4">
                {user ? (
                    <>
                        <span>欢迎，{user?.username}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            退出登录
                        </button>
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
