const express = require("express");
const htmlToDocx = require("html-to-docx");
const puppeteer = require("puppeteer");

const router = express.Router();


// ================= DOCX (PERFECT) =================

router.post("/docx", async (req, res) => {
  try {
    const { html } = req.body;

    const docxBuffer = await htmlToDocx(html, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=document.docx"
    );
    res.send(docxBuffer);

  } catch (err) {
    console.error("DOCX ERROR:", err);
    res.status(500).json({ message: "DOCX export failed" });
  }
});

// ================= PDF (PERFECT) =================
const html_to_pdf = require("html-pdf-node");

router.post("/pdf", async (req, res) => {
  try {
    const { html, title = "Document" } = req.body;

    const file = {
      content: `
        <html>
          <head>
            <style>
              body {
                font-family: "Times New Roman", serif;
                line-height: 1.6;
                padding: 0;
                margin: 0;
                color: #000;
              }

              .container {
                padding: 40px;
              }

              /* Title */
              .doc-title {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
              }

              /* Headings */
              h1, h2, h3 {
                font-weight: bold;
                margin-top: 20px;
                margin-bottom: 10px;
              }

              p {
                margin-bottom: 12px;
              }
            
/* ✅ IMAGE ALIGNMENT (ADD THIS) */
.ql-align-left img {
  display: block;
  margin-right: auto;
}

.ql-align-center img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.ql-align-right img {
  display: block;
  margin-left: auto;
}

/* ✅ IMAGE SIZE FIX */
img {
  max-width: 100%;
  height: auto;
  margin: 10px 0;
}  

              strong {
                font-weight: bold;
              }

              em {
                font-style: italic;
              }

              ul, ol {
                margin-left: 20px;
                margin-bottom: 10px;
              }

              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 15px;
              }

              table, th, td {
                border: 1px solid #ccc;
              }

              th, td {
                padding: 8px;
              }

              /* Page Break Support */
              .page-break {
                page-break-before: always;
              }

              /* Header */
              .header {
                position: fixed;
                top: 0;
                width: 100%;
                text-align: center;
                font-size: 12px;
                border-bottom: 1px solid #ccc;
                padding: 5px 0;
              }

              /* Footer */
              .footer {
                position: fixed;
                bottom: 0;
                width: 100%;
                text-align: center;
                font-size: 12px;
                border-top: 1px solid #ccc;
                padding: 5px 0;
              }

              .page-number:after {
                content: counter(page);
              }
            </style>
          </head>

          <body>

            <!-- Header -->
            <div class="header">
              ${title}
            </div>

            <!-- Footer -->
            <div class="footer">
              Page <span class="page-number"></span>
            </div>

            <!-- Content -->
            <div class="container">
              <div class="doc-title">${title}</div>
              ${html}
            </div>

          </body>
        </html>
      `,
    };

    const options = {
      format: "A4",
      margin: {
        top: "30mm",
        bottom: "30mm",
        left: "20mm",
        right: "20mm",
      },
    };

    const pdfBuffer = await html_to_pdf.generatePdf(file, options);

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);

  } catch (err) {
    console.error("PDF ERROR:", err);
    res.status(500).json({ message: "PDF export failed" });
  }
});
module.exports = router;