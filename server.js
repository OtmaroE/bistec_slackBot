require('dotenv').config();
const fastify = require('fastify')();
const slashCommands = require('./slashCommands/bistec');
const auth = require('./authetication/slackAuth');
const events = require('./index/events');

fastify.register(require('fastify-formbody'));

fastify.listen(80, (err, address) => {
    if (err) console.log(err)
    console.log(`server listening on ${address}`)
});
slashCommands(fastify);
auth(fastify);
events(fastify);