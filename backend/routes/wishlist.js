const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Middleware to verify token
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

// GET wishlist
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    res.json({ wishlist: user.wishlist || [] })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// ADD to wishlist
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

// REMOVE from wishlist
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