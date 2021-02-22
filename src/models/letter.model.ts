import { Schema, model } from 'mongoose'

const LetterSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        gift: {
            type: String
        },
        author: {
            type: Schema.Types.ObjectId, ref: 'User',
            required: true
        }
    }, {
        timestamps: true
    }
)

export default model('Letter', LetterSchema)