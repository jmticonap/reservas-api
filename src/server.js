const app = require('./app')

const HOSTNAME = process.env.HOSTNAME
  ? process.env.HOSTNAME
  : 'localhost'
const PORT = process.env.PORT
  ? process.env.PORT
  : '8000'

const server = app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running\nhttp://${HOSTNAME}:${PORT}`)
})

module.exports = server
