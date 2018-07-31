const axios = require('axios');
const { bot_token, password_secret, api_baseUrl } = process.env;

const sendMessageToSlack = (channel, text) => {
    axios.get('https://slack.com/api/chat.postMessage', {
        params: {
            token: bot_token,
            channel: channel,
            text: text
        }
    })
    .then((respose) => {
        console.log(`message sent ${respose.data}`);
    })
    .catch((err) => {
        console.log(err);
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
        url: api_baseUrl + '/api/users/login'
    }
    return axios(options)
    .then((respose) => {
        return respose.data.token;
    })
    .catch(err => console.log(err));
}
module.exports = {
    sendMessageToSlack,
    logInGetToken
};
