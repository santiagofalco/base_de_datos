import knex from 'knex'

let sqlite = {
    client: 'sqlite3',
    connection: {
        filename: './db.sqlite'
    },
    useNullAsDefault: true
}

let db = knex(sqlite)
try {
    let exists = await db.schema.hasTable('products')
    if (exists) {
        console.log(exists)
    }else {
        await db.schema.createTable('products', table => {
            table.primary('id')
            table.increments('id')
            table.string('name', 30)
            table.float('price', 4)
            table.string('thumbnail', 150)
        })
        await db.schema.createTable('messages', table => {
            table.primary('id')
            table.increments('id')
            table.string('email', 30)
            table.string('message', 256)
            table.string('hour', 30)
        })

    }
    
} catch (error) {
    console.log(error)
}

export default db