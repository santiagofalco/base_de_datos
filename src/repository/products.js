import fs from 'fs'

class Repository {

    constructor(fileName) {
        this.fileName = fileName
    }

    getAll = async () => {
        try {
            if (fs.existsSync(this.fileName)) {
                let fileData = await fs.promises.readFile(this.fileName, 'utf-8')
                let productos = JSON.parse(fileData)
                return productos
            } else {
                return [] //No hay productos, devuelvo array vacio
            }

        } catch (err) {
            console.error('Error' + err)
            throw err
        }
    }

    create = async (productoItem) => {
        try {
            let productos = await this.getAll()
            if (productos.length === 0) { //No existe o vacio
                productoItem.id = 1
                productos.push(productoItem)
                await fs.promises.writeFile(this.fileName, JSON.stringify(productos, null, '\t'))
            } else { // mas de un producto
                productoItem.id = productos[productos.length - 1].id + 1
                productos.push(productoItem)
                await fs.promises.writeFile(this.fileName, JSON.stringify(productos, null, '\t'))
            }
            return productoItem.id
        } catch (err) {
            console.error('Error' + err)
            throw err
        }
    }


}

export default Repository