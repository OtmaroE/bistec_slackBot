const axios = require('axios');
const { bot_token, api_token } = process.env;
const url = 'http://localhost:3000/api';

const sendMessageToSlack = (channel, text) => {
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
        console.log(err);
    })
};

const bistecApiRequest = (route, method = 'GET', data = {}) => {
    axios({
        method,
        headers: {
            'Authorization': token,
            'Content-type': 'application/json',
        },
        url: url + route,
        data,
    })
    .then(response => response)
    .catch(err => console.log(err));
};

module.exports = {
    sendMessageToSlack,
    bistecApiRequest,
};
