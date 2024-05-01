import { SingleMessagePageProps } from "@/app/(home)/messages/[id]/page"
import { NextResponse } from "next/server"


// GET requests work dynamically in nextjs - no need to force a dynamic handling
export async function GET({params}: SingleMessagePageProps) {
    const id = params.id

    const res = await fetch(`http://localhost:4000/messages/${id}`)

    const message = await res.json()

    // first, check if the message even exists
    if(!res.ok) {
        return NextResponse.json({error: 'Can not find the message'}, {
            status: 404
        })
    }

    // if it is not an error and "passes" the if statement, we can send back the ticket with a status of 200
    return NextResponse.json(message, {
        status: 200
    })
}