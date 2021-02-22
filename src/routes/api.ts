import { Router } from 'express'

import AuthRouter from '@routes/auth.routes'
import LetterRoutes from '@routes/letter.routes'

class ApiRouter {
    static loadRoutes() {
        const router = Router()

        router.use('/auth', AuthRouter)
        router.use('/letter', LetterRoutes)

        return router
    }
}

export default ApiRouter.loadRoutes()