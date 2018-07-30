const axios = require('axios');
const { bot_token } = process.env;

const sendMessagetoSlack = (channel, text) => {
    axios.get('https://slack.com/api/chat.postMessage', {
        params: {
            token: bot_token,
            channel: channel,
            text: text
        }
    })
    .then((respose) => {
        console.log(`message sent ${respose}`);
    })
    .catch((err) => {
        console.log('could not sent message');
    })
};

module.exports = {
    sendMessagetoSlack
};
