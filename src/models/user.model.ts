import { Schema, model, Document } from 'mongoose'
// @ts-ignore
import bcrypt from 'mongoose-bcrypt'

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            index: { unique: true }
        },
        password: {
            type: String,
            required: true,
            bcrypt: true
        }
    }, {
        timestamps: true
    }
)

UserSchema.plugin(bcrypt)

UserSchema.methods.toJSON = function() {
    let obj = this.toObject()

    // @ts-ignore
    delete obj.password

    return obj
}

type IUser = {
    username: string
    password: string

    verifyPasswordSync: any
}

export default model<IUser & Document>('User', UserSchema)