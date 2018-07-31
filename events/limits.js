const { sendMessageToSlack, bistecApiRequest } = require('./helper');
const { bot_token, api_token } = process.env;
const axios = require('axios');

const show = async (data) => {
    const apiRequest = await bistecApiRequest('/users/credit', 'get');
    return sendMessageToSlack(data.channel, '');
}

const change = (data) => {
    let method;
    const headers = { 'Authorization': api_token, 'content-type':'application/json' };
    const baseUrl = 'http://localhost:3000/api';
    const limit = data.limit;

    (data.who === 'global') ? method = 'PUT' : method = 'PATCH';
    if (method === 'PATCH') {
        axios({method: 'GET', headers, url: `${baseUrl}/users/info/${data.who}`})
        .then(response => {
            const { data: { _id: userId }} = response;
            return axios({method, headers: { 'Authorization': api_token, 'content-type':'application/json' }, url: `${baseUrl}/users/${userId}`, data: { limit }});
        })
        .then(updated => {
            return sendMessageToSlack(data.channel, updated.data.message);
        })
        .catch(err => {
            console.log(err);
        })
    } else {
        axios({method, headers, url: `http://localhost:3000/api/users`, data: { limit }})
        .then(updated => {
            return sendMessageToSlack(data.channel, updated.data.message);
        })
        .catch(err => {
            console.log(err);
        })
    }
}

module.exports = {
    show,
    change,
};