import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import User from '@models/user.model'

class AuthController {

    static async signIn(req: Request, res: Response) {
        const { username, password } = req.body

        if (!username || !password) {
            return res
                .status(400)
                .json({ success: false, error: 'Username and Password are required to SignIn.' })
        }

        const userFound = await User.findOne({ username })

        if (userFound && userFound.verifyPasswordSync(password)) {
            let { JWT_SECRET } = process.env
            JWT_SECRET = JWT_SECRET || 'SECRET'

            const token = jwt.sign({ id: userFound._id }, JWT_SECRET)

            return res
                .status(200)
                .json({ success: true, user: userFound.toJSON(), token })
        }

        return res.status(400).json({ success: false, error: 'Username/Password invalid.' })
    }

    static async signUp(req: Request, res: Response) {
        const { username, password } = req.body

        if (!username || !password) {
            return res
                .status(400)
                .json({ success: false, error: 'Username and Password are required to SignIn.' })
        }

        try {
            const userCreated = await User.create({ username, password })

            return res.status(200).json({ success: true, user: userCreated.toJSON() })

        } catch (err) {
            let error = ''

            switch (err.code) {
                case 11000:
                    error = `Duplicate key error collection: ${username} has already been used`
                break

                default:
                    error = 'An unexpected error occurred when trying to create the user.'
                break
            }

            return res.status(400).json({ success: false, error: error })
        }
    }

}

export default AuthController