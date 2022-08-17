import { Router } from 'express'
import Service from '../services/service.js'
import db from '../db/dataBase.js'
import RepositoryWithFs from '../repository/products.js'
import Repository from '../repository/productsWithDb.js'


const router = Router()

const repositoryWithFs = new RepositoryWithFs('./products.json')
const repository = new Repository(db)

const service = new Service(repository, repositoryWithFs)

let io

router.get('/', async (req, res) => {
    let productos = await service.getAll()
    res.render('products.pug', {
        message: 'Lista de productos',
        productos
    })
})

router.post('/', async (req, res) => {
    const producto = req.body
    if (!producto.name) {
        return res.status(400).send({ status: 'error', error: 'No se envio un nombre de producto' })
    }
    if (!producto.price) {
        return res.status(400).send({ status: 'error', error: 'No se envio un precio de producto' })
    }
    if (!producto.thumbnail) {
        return res.status(400).send({ status: 'error', error: 'No se envio una url de producto' })
    } else {
        const idInsertado = await service.post(producto)
        io.emit('productList', producto)
        res.send({ status: 'success', message: `Producto añadido con id ${idInsertado}` })
    }
})

const getRouter = (socket) => {
    io = socket
    return router
}

export default getRouter