const express = require('express');
const router = express.Router();
const { shortenUrl, redirectToOriginal } = require('../controllers/urlController');

router.post('/shorten', shortenUrl);
router.get('/:shortCode', redirectToOriginal);

// router.get("/ping", (req, res) => {
//   res.status(200).json({ message: "pong" });
// });


// router.post("/test", (req, res) => {
//   console.log("📥 Received Body:", req.body);
//   res.status(200).json({ message: "Test endpoint hit successfully" });
// });

module.exports = router;