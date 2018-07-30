const api = require('../events/index');

module.exports = (fastify) => {
  fastify.post('/event', (req, reply) => {
    const { type } = req.body.event;
    reply.status(200);
    reply.send();
    switch(type.toLowerCase()) {
      case 'message': {
        return api.answerMessage(req.body);
      }
    }
  })
}