const express = require("express");
const multer = require("multer");
const mammoth = require("mammoth");
const fs = require("fs");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let html = "";

    // ✅ BEST: DOCX → HTML (keeps formatting)
  if (file.originalname.endsWith(".docx")) {
  const result = await mammoth.convertToHtml({
    path: file.path,
    convertImage: mammoth.images.inline(async (element) => {
      const imageBuffer = await element.read();
      const base64 = imageBuffer.toString("base64");

      return {
        src: `data:${element.contentType};base64,${base64}`,
      };
    }),
  });

  html = result.value;
}
  res.json({ html });
  } catch (error) {
    res.status(500).json({ message: "Error processing file", error: error.message });
  }
});

module.exports = router;