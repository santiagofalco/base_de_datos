import fs from 'fs'

class Repository {

    constructor(fileName) {
        this.fileName = fileName
    }

    getAllMessages = async () => {
        try {
            if (fs.existsSync(this.fileName)) {
                let fileData = await fs.promises.readFile(this.fileName, 'utf-8')
                let messages = JSON.parse(fileData)
                return messages
            } else {
                return [] //No hay mensajes, devuelvo array vacio
            }

        } catch (err) {
            console.error('Error' + err)
            return null
        }
    }

    create = async (data) => {
        try {
            let messages = await this.getAllMessages()
            messages.push(data)
            await fs.promises.writeFile(this.fileName, JSON.stringify(messages, null, '\t'))
            return messages
        } catch (err) {
            console.error('Error' + err)
            return null
        }
    }

}

export default Repository