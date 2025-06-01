'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
    username: string
}

interface UserContextType {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    loading: boolean
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    loading: true,
})

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
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

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}
