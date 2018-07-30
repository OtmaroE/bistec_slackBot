const axios = require('axios');

module.exports = (fastify) => {
  fastify.post('/event', (req, res) => {
    if(!req.body.event) return res.send();
    if(req.body.event.type === 'message'){
        res.send('hola');
        console.log('Holas was sent!');
    }
    console.log(req.body);
    res.send( );
  })
}