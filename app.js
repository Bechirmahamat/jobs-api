require('dotenv').config()
require('express-async-errors')

/*
 ########## extra package  ###############
*/
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
// create a express instance
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
app.set('trust proxy', 1)
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
        standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
        // store: ... , // Redis, Memcached, etc. See below.
    })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
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
