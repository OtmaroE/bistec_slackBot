const events = require('../events');
const actions = require('../actions');
module.exports = (fastify) => {
  fastify.post('/event', (req, reply) => {
    reply.status(200);
    if(req.body.event.bot_id) return "";
    reply.send();
    return events.answerMessage(req.body);
  })
  fastify.post('/actions', (req, reply) => {
    const payload = JSON.parse(req.body.payload);
    return actions.answerInteraction(payload);
  })
}