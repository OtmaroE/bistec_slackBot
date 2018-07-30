const { clientId, clientSecret } = process.env;
const axios = require('axios');

module.exports = (fastify) => {
  fastify.get('/oauth', async (req, res) => {
    if (!req.query.code) {
        res.type('application/json').status(500);
        return {"Error": "Looks like we're not getting code."};
    }
    const request = await axios.get('https://slack.com/api/oauth.access', {
      params: {
        code: req.query.code,
        client_id: clientId,
        client_secret: clientSecret
      }
    })
    res.type('application/json').code(200);
    return request.data;
  })
}