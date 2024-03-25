require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const authenticateUser = require('./middleware/Authenticated')
// routers
const authRouter = require('./Routes/Auth')
const jobsRouter = require('./Routes/Jobs')
// connectionDb

const connectionDB = require('./db/conn')
/*
####    Port    ####   */
const PORT = process.env.PORT || 3000

const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/ErrorHandler')
const { exists } = require('./Models/User')

/*
####   useFull packages    ####   */
app.use(express.json())

/*
####   Routes    ####   */
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

/*
####   Middlewares    ####   */

app.use(notFound)
app.use(errorHandlerMiddleware)
/*
####   Starting app     ####   */

const start = async () => {
    try {
        // well
        await connectionDB(process.env.MONGO_URI)
        app.listen(PORT, () =>
            console.log(`Server is listening on port: ${PORT}`)
        )
    } catch (error) {
        console.log(error)
    }
}
start()
