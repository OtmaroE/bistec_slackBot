const axios = require('axios');
const helper = require('./helper');
const { api_token, api_baseUrl, password_secret } = process.env;

module.exports = (data) => {
    const body = {
        username: data.username,
        password: data.username + password_secret,
        slackId: data.username,
        role: 'admin'
    };
    const options = {
        method: 'POST',
        header: { 'Content-type': 'application/json', 'Authorization': api_token },
        data: body,
        url: api_baseUrl + '/api/users'
    };
    axios(options)
    .then((response) => {
        helper.sendMessagetoSlack(data.channel, 'User registered!');
    })
    .catch((err) => {
        helper.sendMessagetoSlack(data.channel, err.response.data.message);
    });
};
