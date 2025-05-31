'use client'

import { useEffect, useState } from 'react'

export function useUser() {
    const [user, setUser] = useState<{ username: string } | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/me')
            .then(res => res.json())
            .then(data => {
                if (data.loggedIn) setUser({ username: data.username })
                else setUser(null)
            })
            .finally(() => setLoading(false))
    }, [])

    return { user, loading }
}
