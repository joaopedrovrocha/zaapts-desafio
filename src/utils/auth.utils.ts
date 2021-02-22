import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import User from '@models/user.model'

class Auth {

    static async verifyJWT(req: Request, res: Response, next: any) {
        const token = req.headers['x-access-token']

        if (!token) {
            return res.status(401).json({ success: false, error: 'No token provided.' })
        }

        let { JWT_SECRET } = process.env
        JWT_SECRET = JWT_SECRET || 'SECRET'

        const decoded = jwt.verify(token.toString(), JWT_SECRET);

        if (!decoded) {
            return res.status(500).json({ success: false, error: 'Failed to authenticate token.' })
        }

        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(500).json({ success: false, error: 'User not found to authenticate.' })
        }

        req.user = user.toJSON()

        next()
    }
}

export default Auth