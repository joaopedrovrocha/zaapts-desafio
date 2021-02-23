import { Router } from 'express'

import LetterController from "../controllers/letter.controller";
import AuthUtils from "../utils/auth.utils"

class LetterRoutes {
    static loadRoutes() {
        const router = Router()

        router.get('/', AuthUtils.verifyJWT, LetterController.index)
        router.get('/:id', AuthUtils.verifyJWT, LetterController.show)
        router.post('/', AuthUtils.verifyJWT, LetterController.create)
        router.put('/:id', AuthUtils.verifyJWT, LetterController.store)
        router.delete('/:id', AuthUtils.verifyJWT, LetterController.delete)

        return router
    }

}

export default LetterRoutes.loadRoutes()