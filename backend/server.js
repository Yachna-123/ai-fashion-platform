const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again after 15 minutes' }
})
app.use('/api/', limiter)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log('MongoDB Error:', err))

app.get('/', (req, res) => {
  res.json({ message: 'StyleAI Backend is running!' })
})

const authRoutes = require('./routes/auth')
const aiRoutes = require('./routes/ai')
const wishlistRoutes = require('./routes/wishlist')

app.use('/api/auth', authRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/wishlist', wishlistRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})