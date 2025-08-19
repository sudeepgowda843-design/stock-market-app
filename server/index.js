const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { setupSocket } = require('./utils/socket');

dotenv.config();

const app = express();
const server = http.createServer(app);
setupSocket(server);

app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/stocks', require('./routes/stocks'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server/index.js
app.get('/api/stocks', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );

    const stocks = data.top_gainers.slice(0, 10).map(stock => ({
      symbol: stock.ticker,
      name: stock.ticker, // Alpha Vantage doesn’t return name, so we’ll enhance later
      price: parseFloat(stock.price),
      change: parseFloat(stock.change_percent),
    }));

    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});