const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log('MongoDB Error:', err))

app.get('/', (req, res) => {
  res.json({ message: 'StyleAI Backend is running!' })
})

const PORT = process.env.PORT || 5000
const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})