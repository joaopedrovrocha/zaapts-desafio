import { Router } from 'express'

import AuthController from "@controllers/auth.controller";

class AuthRoutes {
    static loadRoutes() {
        const router = Router()

        router.post('/signin', AuthController.signIn)
        router.post('/signup', AuthController.signUp)

        return router
    }

}

export default AuthRoutes.loadRoutes()