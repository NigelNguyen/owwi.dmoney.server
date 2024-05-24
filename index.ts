import express, { Request, Response } from 'express'
import cors from 'cors'
import session from 'express-session'
import connectMongoDBSession from 'connect-mongodb-session'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { IPlainObject } from './types/common'
import User from './models/User'
import { cookiesParser } from './utils/cookies'

import authRouter from './routes/auth'
import transactionRouter from './routes/transaction'
import recordRouter from './routes/record'
import categoryRouter from './routes/category'
import partnerRouter from './routes/partner'
import typeRouter from './routes/type'

const app = express()
dotenv.config()

const MONGO_URI = process.env.MONGO_URI || ''
const PORT = process.env.PORT || 5001
const FE_CLIENT_URL = process.env.FE_CLIENT_URL
const SESSION_SECRET = process.env.SESSION_SECRET || ''
const PRODUCTION = process.env.PRODUCTION

const MongoDBStore = connectMongoDBSession(session)

const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: 'UserSessions'
})

app.use(
  cors({
    origin: PRODUCTION ? FE_CLIENT_URL?.split(',') : true,
    credentials: true,
    methods: ['POST, PUT, PATCH, DELETE, GET']
  })
)

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 10000 * 3600 * 24 * 30, // 10 day
      ...(PRODUCTION ? { sameSite: 'none', secure: true } : {})
    }
  })
)

app.use(express.json())

app.use(async (req: Request, res: Response, next) => {
  const sessionID = cookiesParser(req.headers.cookie || '').sessionID
  if (sessionID) {
    store.get(sessionID, async (_err, _session) => {
      const session = _session as IPlainObject

      if (session?.user) {
        const user = await User.findOne({ _id: session.user?._id || '' })

        if (!user) {
          return next()
        }

        ;(req as IPlainObject).user = user

        const reqSession = req.session as IPlainObject
        if (reqSession) {
          reqSession.user = user
          reqSession.sessionID = req.sessionID
        }

        next()
      }
    })
  }
  next()
})

app.use(authRouter)
app.use(transactionRouter)
app.use(recordRouter)
app.use(categoryRouter)
app.use(partnerRouter)
app.use(typeRouter)

mongoose.connect(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
