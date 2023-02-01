const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const { createEndpoint } = require('./route/')

app.use('/server', createEndpoint('products', 'PRODUCT'))

const PORT = process.env.PORT || 3000
app.listen(3000, () => {
  console.log(`http://localhost:${PORT}/server`)
})
