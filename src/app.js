import express from 'express'
import __dirname from './utils.js'
import newSocket from './services/socket.js'
import getRouter from './routes/products.js'

const app = express()

app.use(express.json())

const server = app.listen(8080, () => {
    console.log('Listening on 8080')
})

const io = newSocket(server)
const ProductsView = getRouter(io)

app.set('views', __dirname+'/views')
app.set('view engine', 'pug')


app.use("/public", express.static(__dirname+'/public'));
app.use('/', ProductsView)

