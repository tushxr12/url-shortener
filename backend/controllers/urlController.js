const Url = require('../models/Url');
const { nanoid } = require('nanoid');

const BASE_URL = 'http://localhost:3001'; // Update later

exports.shortenUrl = async (req, res) => {
  console.log("📥 Received Body:", req.body);
  const { originalUrl } = req.body;

  if (!originalUrl || !originalUrl.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const existingUrl = await Url.findOne({ originalUrl });

    if (existingUrl) {
      const existingShortUrl = `${BASE_URL}/${existingUrl.shortCode}`;
      return res.status(200).json({ originalUrl, shortUrl: existingShortUrl });
    }

    const shortCode = nanoid(6);
    const newUrl = new Url({ originalUrl, shortCode });
    await newUrl.save();

    const shortUrl = `${BASE_URL}/${shortCode}`;
    return res.status(201).json({ originalUrl, shortUrl });

  } catch (err) {
    console.error("❌ Error shortening URL:", err);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.redirectToOriginal = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    console.error("❌ Error redirecting:", err);
    res.status(500).json({ error: 'Server Error' });
  }
};
