class Repository {

    constructor(db) {
        this.db = db
    }

    getAll = async () => {
        try {
            let products = await this.db('products').select('*')
            return products

        } catch (err) {
            console.error('Error' + err)
            return null
        }
    }

    create = async (productoItem) => {
        try {
            let result = await this.db('products').insert(productoItem)
            return result[0]
        } catch (err) {
            console.error('Error' + err)
            return null
        }
    }


}

export default Repository