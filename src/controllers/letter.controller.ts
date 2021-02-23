import { Request, Response } from "express";

import Letter from '@models/letter.model'

class LetterController {

    static async index(req: Request, res: Response) {
        const letters = await Letter.find().populate('author')

        res.status(200).json({ success: true, letters })
    }

    static async show(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res
                .status(400)
                .json({ success: false, error: 'Id parameter is required to Show Letter.' })
        }

        const letter = await Letter.findById(id).populate('author')

        if (!letter) {
            return res
                .status(400)
                .json({ success: false, error: 'No Letter was found with the provided ID.' })
        }

        return res
            .status(200)
            .json({ success: true, letter })
    }

    static async create(req: Request, res: Response) {
        const { title, description, gift } = req.body

        if (!title || !description) {
            return res
                .status(400)
                .json({ success: false, error: 'Title and Description are required to Store new Letter.' })
        }

        try {
            const letterCreated = await Letter.create({ title, description, gift, author: req.user })

            return res.status(200).json({ success: true, letter: letterCreated.toJSON() })

        } catch (err) {
            return res.status(400).json({ success: false, error: err })
        }
    }

    static async store(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res
                .status(400)
                .json({ success: false, error: 'Id parameter is required to Show Letter.' })
        }

        const { title, description, gift } = req.body

        if (!title || !description) {
            return res
                .status(400)
                .json({ success: false, error: 'Title and Description are required to Store new Letter.' })
        }

        const letter = await Letter.findById(id).populate('author')

        if (!letter) {
            return res
                .status(400)
                .json({ success: false, error: 'No Letter was found with the provided ID.' })
        }

        try {
            await Letter.updateOne({ _id: id }, { title, description, gift, author: req.user })

            const letter = await Letter.findById(id).populate('author')

            return res.status(200).json({ success: true, letter: letter })

        } catch (err) {
            return res.status(400).json({ success: false, error: err })
        }
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res
                .status(400)
                .json({ success: false, error: 'Id parameter is required to Show Letter.' })
        }

        const letter = await Letter.findById(id).populate('author')

        if (!letter) {
            return res
                .status(400)
                .json({ success: false, error: 'No Letter was found with the provided ID.' })
        }

        letter.remove()

        return res.status(200).json({ success: true })
    }
}

export default LetterController