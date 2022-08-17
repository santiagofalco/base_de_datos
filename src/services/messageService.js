class MessageService {

    constructor(repository, repositoryReplication = null) {
        this.repository = repository
        this.repositoryReplication = repositoryReplication
    }

    getAllMessages = async () => {
        try {
            let messages = await this.repository.getAllMessages()
            return messages
        } catch (err) {
            console.error('Error' + err)
            throw err
        }
    }

    post = async (data) => {
        try {
            let response = await this.repository.create(data)
            if (this.repositoryReplication) {
                await this.repositoryReplication.create(data)
            }
            return response
        } catch (err) {
            console.error('Error' + err)
            throw err
        }
    }

}

export default MessageService