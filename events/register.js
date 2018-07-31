const axios = require('axios');
const helper = require('./helper');
const { api_token, api_baseUrl } = process.env;

module.exports = (data) => {
    if(!data.password)
    helper.sendMessagetoSlack(data.channel, 'please use sintax: `register password:your password here`');
    const body = {
        username: data.username,
        password: data.password,
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
        helper.sendMessagetoSlack(data.channel, 'User created successfully');
    })
    .catch((err) => {
        helper.sendMessagetoSlack(data.channel, err.response.data.message);
    });
};
