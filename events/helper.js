const axios = require('axios');
const { bot_token, password_secret, api_baseURl } = process.env;

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

function logInGetToken(username) {
    const body = {
        username,
        password: username + password_secret
    };
    const options = {
        method: 'POST',
        header: { 'Content-type': 'application/json' },
        data: body,
        url: api_baseURl + '/api/users/login'
    }
    return axios(options)
    .then((respose) => {
        return respose.data.token;
    })
}
module.exports = {
    sendMessagetoSlack,
    logInGetToken
};
