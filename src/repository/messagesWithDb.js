class Repository {

    constructor(db) {
        this.db = db
    }

    getAllMessages = async () => {
        try {
           let messages = await this.db('messages').select('*')
           return messages
        } catch (err) {
            console.error('Error' + err)
            throw err
        }
    }

    create = async (data) => {
        try {
            let result = await this.db('messages').insert(data)
            return result[0]
        } catch (err) {
            console.error('Error' + err)
            return null
        }
    }

}

export default Repository