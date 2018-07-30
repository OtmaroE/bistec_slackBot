const api = require('../events/index');

module.exports = (fastify) => {
  fastify.post('/event', (req, reply) => {
    reply.status(200);
    if(req.body.event.bot_id) return "";
    reply.send();
    return api.answerMessage(req.body);
  })
}