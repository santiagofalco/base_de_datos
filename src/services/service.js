class Service {

    constructor(repository, repositoryReplication = null) {
        this.repository = repository
        this.repositoryReplication = repositoryReplication
    }

    getAll = async () => {
        try {
            const products = await this.repository.getAll()
            // console.log(products)
            return products
        } catch (err) {
            console.error('Error' + err)
            return null
        }
    }

    post = async (productoItem) => {
        try {
            const productId = await this.repository.create(productoItem)
            if (this.repositoryReplication) {
                await this.repositoryReplication.create(productoItem)
            }
            return productId
        } catch (err) {
            console.error('Error' + err)
            return null
        }
    }


}

export default Service