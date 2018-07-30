const axios = require('axios');
const { bot_token } = process.env;

const answerMessage = (body) => {
    const { channel } = body.event;
    const params = {
        token: bot_token,
        channel,
        text: 'Hello!'
    };
    axios.get(`https://slack.com/api/chat.postMessage`, {
        params,
    })
    .then((response) => {
        console.log('Response with status: ', response.status);
    })
};

module.exports = answerMessage;