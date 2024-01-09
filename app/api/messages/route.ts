import { RouteHandlerType } from '@config/types'
import Chat from '@models/Chat'
import Message from '@models/Message'
import { serverErrorResponse } from '@utils/errorResponse'
import logger from '@utils/logger'
import connect from '@utils/mongoose'
import { verifyToken } from '@utils/token'


class Handler implements RouteHandlerType {

    async GET(req: Request): Promise<Response> {
        try {
            connect()
            const { _id } = verifyToken()
            const { searchParams } = new URL(req.url)
            const chatId = searchParams.get('chat')
            const existChat = await Chat.findOne({ _id: chatId, users: { $in: _id } })
            if (!existChat) return Response.json({ error: 'You have no permission' }, { status: 403 })
            const messages = await Message.find({ chat: chatId })
            return Response.json({ messages })
        } catch (err) {
            logger('getMessages', err)
            return serverErrorResponse
        }
    }

    async POST(req: Request): Promise<Response> {
        try {
            connect()
            const { _id } = verifyToken()
            const { text, to } = await req.json()
            const existChat = await Chat.findOne({ users: { $all: [_id, to] } })

            if (!existChat) {
                const chat = new Chat({ users: [_id, to] })
                const newChat = await chat.save()

                const doc = new Message({ user: _id, content: text, chat: newChat._id })
                const message = await doc.save()
                return Response.json({ message })
            }

            const doc = new Message({ user: _id, content: text, chat: existChat._id })
            const message = await doc.save()
            return Response.json({ message })
        } catch (err) {
            logger('postMessage', err)
            return serverErrorResponse
        }
    }

}

export const { GET, POST } = new Handler()
