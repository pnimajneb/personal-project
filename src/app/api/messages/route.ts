import { NextResponse } from "next/server"

export async function GET() {
    const res = await fetch('http://localhost:4000/messages/')

    const messages = await res.json()

    return NextResponse.json(messages, {
        status: 200
    })
}