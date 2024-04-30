import { NextRequest, NextResponse } from "next/server"


// GET requests work dynamically in nextjs - no need to force a dynamic handling
export async function GET() {
    const res = await fetch('http://localhost:4000/messages/')

    const messages = await res.json()

    return NextResponse.json(messages, {
        status: 200
    })
}

export async function POST(request: NextRequest) {
    const message = await request.json()

    const res = await fetch("http://localhost:4000/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      })

      // of course, all of this is redundant - just working on it to understand the way POST requests work and how to use the request object to use the json data
      // here it sends me back the new ticket, it also has the id on it that the json server creates for me
      // i can now handle the post request and i can try this from the json server via postman!
      const newMessage = await res.json()

      return NextResponse.json(newMessage, {
        status: 201
      })
}