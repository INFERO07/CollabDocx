const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ✅ Load API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Chat route
router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ reply: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });

  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      reply: "AI is busy, try again later",
    });
  }
});

module.exports = router;