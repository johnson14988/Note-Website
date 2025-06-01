import { NextResponse } from 'next/server'

export async function POST() {
    const response = NextResponse.json({ success: true })

    // 清除 token cookie：设置为空，立即过期
    response.cookies.set('token', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    })

    return response
}
