import { Router } from 'express'

import AuthRouter from './auth.routes'
import LetterRoutes from './letter.routes'

class ApiRouter {
    static loadRoutes() {
        const router = Router()

        router.use('/auth', AuthRouter)
        router.use('/letter', LetterRoutes)

        return router
    }
}

export default ApiRouter.loadRoutes()