const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wishlist: { type: [String], default: [] }
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    res.json({ wishlist: user.wishlist || [] })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/add', auth, async (req, res) => {
  try {
    const { item } = req.body
    const user = await User.findById(req.userId)
    if (!user.wishlist) user.wishlist = []
    if (!user.wishlist.includes(item)) {
      user.wishlist.push(item)
      await user.save()
    }
    res.json({ wishlist: user.wishlist })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/remove', auth, async (req, res) => {
  try {
    const { item } = req.body
    const user = await User.findById(req.userId)
    user.wishlist = (user.wishlist || []).filter(i => i !== item)
    await user.save()
    res.json({ wishlist: user.wishlist })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router