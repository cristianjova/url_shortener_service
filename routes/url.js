const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

// Import model
const Url = require('../models/Url');

// @route POST  /api/shorturl/new
// desc   Create short url
router.post('/new', async (req, res) => {
  const { originalUrl } = req.body;
  const baseUrl = config.get('baseUrl');
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(originalUrl)) {
    try {
      let url = await Url.findOne({ originalUrl });

      if (url) {
        res.json({ original_url: url.originalUrl, short_url: url.urlCode });
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          originalUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json({ original_url: url.originalUrl, short_url: url.urlCode });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(401).json({ error: 'invalid URL' });
  }
});

module.exports = router;
