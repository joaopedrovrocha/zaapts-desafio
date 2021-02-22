import app from './app'

class Server {
    static start() {
        const { PORT } = process.env

        // @ts-ignore
        app.listen(PORT, err => {
            if (err) {
                return console.error(err)
            }

            return console.log(`[SERVER] listening on port ${PORT}`)
        })
    }
}

export default Server.start()