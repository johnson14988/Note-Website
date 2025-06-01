'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
    const router = useRouter()

    useEffect(() => {
        fetch('/api/logout', { method: 'POST' }).then(() => {
            router.push('/')  // 或 router.replace('/')，回到首页
        })
    }, [router])

    return <p style={{ padding: 20 }}>正在退出登录...</p>
}
