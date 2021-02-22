import express, { json } from 'express'
import dotenv from 'dotenv'

import Database from './database'
import ApiRouter from '@routes/api'

class Init {

    app

    constructor() {
        this.app = express()

        this.config()
        this.middleware()
        this.routes()
        this.database()
    }

    config() {
        dotenv.config()
    }

    middleware() {
        this.app.use(json())
    }

    routes() {
        this.app.use('/api/v1/', ApiRouter)
    }

    database() {
        Database.connect()
    }
}

export default new Init().app