import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { z } from "zod"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const session = await getServerSession(authOptions)
        const { id: idToDeny } = z.object({ id: z.string() }).parse(body)

        if (!session) {
            return new Response('Unauthorized', { status: 400 })
        }

        await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToDeny)

        return new Response('Ok', { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid requests payload', { status: 422 })
        }
        return new Response('Invalid request', { status: 400 })
    }
}
