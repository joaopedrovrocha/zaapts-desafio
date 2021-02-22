import mongoose from 'mongoose'

class Database {

    static connect() {
        const {
            MONGODB_USER,
            MONGODB_PASSWORD,
            MONGODB_HOST,
            MONGODB_NAME
        } = process.env

        const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_NAME}?retryWrites=true&w=majority`

        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
            if (err) {
                return console.error(err)
            }

            return console.log('[DATABASE] mongodb connected')
        });
    }
}

export default Database