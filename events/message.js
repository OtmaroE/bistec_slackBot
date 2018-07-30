const axios = require('axios');
const { bot_token } = process.env;

const answerMessage = (body) => {
    console.log(body);
    const { channel } = body.event;
    const params = {
        token: bot_token,
        channel,
        text: 'Hello!'
    };
    axios.get(`https://slack.com/api/chat.postMessage`, {
        params,
    }).then((response) => {
        console.log(response);
    })
};

module.exports = answerMessage;