module.exports = (fastify) => {
  fastify.post('/bistec', (req, res) => {
      res.send('Welcome to bistec!\n We are currently on development, please visit us soon!')
  });
}