'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
    const router = useRouter()

    useEffect(() => {
        fetch('/api/logout', { method: 'POST' }).then(() => {
            router.push('/')
        })
    }, [router])

    return <p>正在退出登录...</p>
}
