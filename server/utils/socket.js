let io;

function setupSocket(server) {
  io = require('socket.io')(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    setInterval(() => {
      const randomPrice = Math.random() * 100 + 100;
      io.emit('priceUpdate', { symbol: 'AAPL', price: randomPrice.toFixed(2) });
    }, 3000);
  });
}

module.exports = { setupSocket };