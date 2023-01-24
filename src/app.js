
const express = require('express')
const cors = require('cors')
const db = require('./database/database')
const errorHandler = require('./middlewares/error.middleware')
const initModels = require('./models/initModels')
const compression = require('compression')
const helmet = require('helmet')

const userRouter = require('./routers/user.route')
const authRouter = require('./routers/auth.route')

//const initData = require('./seeders/initData')

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(compression())

Promise
  .all([initModels(), db.authenticate()])
  .then(() => {
    console.log('initModels\t ...done\n', '\bdb.authenticate\t ...done')
    return db.sync({
      force: process.env.NODE_ENV !== 'pro'
    })
  })
  .then(() => {
    console.log('db.sync\t\t ...done')
    //process.env.NODE_ENV !== 'pro' && initData(db)
  })
  .catch(error => {
    console.error(error)
  })

app.get('/', (req, res, next) => {
  res
    .status(200)
    .json({
      message: 'hello world'
    })
  next()
})
const basePath = '/api/'
app.use(basePath, userRouter)
app.use(basePath, authRouter)

app.use(errorHandler)

module.exports = app