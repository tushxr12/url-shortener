const Url = require('../models/Url');
const { nanoid } = require('nanoid');

const BASE_URL = 'http://localhost:3000'; // update this to use actual base URL during production

exports.shortenUrl = async (req, res) => {
    console.log("📥 Received Body:", req.body);
  const { originalUrl } = req.body;

  if (!originalUrl || !originalUrl.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const shortCode = nanoid(6);
  const shortUrl = `${BASE_URL}/${shortCode}`;

  try {
    const newUrl = new Url({ originalUrl, shortCode });
    await newUrl.save();
    res.status(201).json({ originalUrl, shortUrl });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
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
    res.status(500).json({ error: 'Server Error' });
  }
};
