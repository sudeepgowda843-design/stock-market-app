const express = require('express');
const router = express.Router();

// Mocked stock list
const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 192.34 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 276.89 },
];

router.get('/', (req, res) => {
  res.json(stocks);
});

module.exports = router;