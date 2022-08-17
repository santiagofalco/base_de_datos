import { Server } from 'socket.io'
import db from '../db/dataBase.js'
import RepositoryMessagesWithDb from '../repository/messagesWithDb.js'
import RepositoryMessagesWithFs from '../repository/messages.js'
import MessageService from './messageService.js'
import Service from './service.js'

let io = undefined

const messageRepositoryWithFs = new RepositoryMessagesWithFs('./messages.json')
const messageRepository = new RepositoryMessagesWithDb(db)
const messageService = new MessageService(messageRepository, messageRepositoryWithFs)

const newSocket = (server) => {
    if (!io) {
        io = new Server(server)

        io.on('connection', socket => {
            console.log('Cliente conectado en socket con id: ' + socket.id)

            socket.on('message', async data => {
                let mensaje = await messageService.post(data)
                let history = await messageService.getAllMessages()
                io.emit('mensajes', history) //envia todos los mensajes
            })
        })
    }

    return io
}

export const getSocket = () => {
    return io
}

export default newSocket