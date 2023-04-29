import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"
import { getServerSession } from "next-auth"
import { z } from "zod"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const session = await getServerSession(authOptions)
        const { id: idToAdd } = z.object({ id: z.string() }).parse(body)

        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }

        //If users are already friends
        const isAldreadyFriends = await fetchRedis(
            'sismember',
            `user:${session.user.id}:friends`,
            idToAdd
        )

        if (isAldreadyFriends) {
            return new Response('You and this person are already friends', { status: 400 })
        }

        const hasFriendRequest = await fetchRedis(
            'sismember',
            `user:${session.user.id}:incoming_friend_requests`,
            idToAdd
        )

        if (!hasFriendRequest) {
            return new Response('No friend request', { status: 400 })
        }

        pusherServer.trigger(toPusherKey(`user:${idToAdd}:friends`), 'new_friend', '')

        await db.sadd(`user:${session.user.id}:friends`, idToAdd)
        await db.sadd(`user:${idToAdd}:friends`, session.user.id)
        await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd)

        return new Response('Ok', { status: 200 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid requests payload', { status: 422 })
        }
        return new Response('Invalid rquest', { status: 400 })
    }
}