const fastify = require('fastify')();
const slashCommands = require('./slashCommands/bistec');
const auth = require('./authetication/slackAuth');
const events = require('./events/events');

fastify.register(require('fastify-formbody'));

fastify.listen(3000, (err, address) => {
    if (err) fastify.log.error(err)
    console.log(`server listening on ${address}`)
});
slashCommands(fastify);
auth(fastify);
events(fastify);