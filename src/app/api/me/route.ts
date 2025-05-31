import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value

        if (!token) {
            return NextResponse.json({ loggedIn: false })
        }

        const payload = jwt.verify(token, JWT_SECRET) as { username: string }

        return NextResponse.json({ loggedIn: true, username: payload.username })
    } catch {
        return NextResponse.json({ loggedIn: false })
    }
}
