const api = require('../events/index');

module.exports = (fastify) => {
  fastify.post('/event', (req, reply) => {
    const { type } = req.body.event;
    reply.status(200);
    if(req.body.event.bot_id) return "";
    switch(type.toLowerCase()) {
        case 'message': {
           api.answerMessage(req.body);
          break;
        }
    }
    reply.send();
  })
}