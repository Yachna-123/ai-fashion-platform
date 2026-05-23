const express = require('express')
const router = express.Router()

const outfits = [
  { id: 1, name: "Beige Linen Set", price: 2199, aesthetic: "Old Money", emoji: "👔" },
  { id: 2, name: "Y2K Crop Top", price: 999, aesthetic: "Y2K Vibes", emoji: "👚" },
  { id: 3, name: "Oversized Hoodie", price: 1499, aesthetic: "Street Style", emoji: "🧥" },
  { id: 4, name: "Floral Sundress", price: 1799, aesthetic: "Summer Casual", emoji: "👗" },
  { id: 5, name: "Sequin Mini Dress", price: 2499, aesthetic: "Party Look", emoji: "✨" },
  { id: 6, name: "Blazer + Trousers", price: 3199, aesthetic: "Old Money", emoji: "🎩" },
  { id: 7, name: "Denim Jacket", price: 1299, aesthetic: "Street Style", emoji: "🧤" },
  { id: 8, name: "Floral Co-ord Set", price: 2099, aesthetic: "Summer Casual", emoji: "🌸" },
]

router.post('/search', async (req, res) => {
  try {
    const { query } = req.body
    if (!query) return res.status(400).json({ message: 'Query is required' })

    const prompt = `
You are a fashion AI assistant for StyleAI, an Indian fashion platform.
A user searched: "${query}"

Here are the available outfits:
${JSON.stringify(outfits)}

Return ONLY a JSON array of outfit IDs that match the user's request.
Consider price, aesthetic, and style. 
Example: [1, 3, 5]
Return ONLY the array, no explanation, no markdown, no backticks.
`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Gemini error:', data)
      if (response.status === 429) {
        return res.status(429).json({ message: 'AI is busy, please try again in a moment!' })
      }
      return res.status(500).json({ message: 'AI search failed' })
    }

    const text = data.candidates[0].content.parts[0].text.trim()
    const ids = JSON.parse(text)
    const matched = outfits.filter(o => ids.includes(o.id))
    res.json({ results: matched, query })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'AI search failed' })
  }
})

module.exports = router