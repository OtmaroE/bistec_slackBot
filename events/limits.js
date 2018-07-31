const { sendMessageToSlack } = require('./helper');
const { bot_token, api_token } = process.env;
const axios = require('axios');
const headers = { 'Authorization': api_token, 'content-type':'application/json' };
const baseUrl = 'http://localhost:3000/api';

const show = (data) => {
    let who = '';
    (data.show === 'my') ? who = data.user : (data.show === 'global') ? who = data.show : who = data.show.substring(2,11);
    axios({ method: 'GET', headers, url: `${baseUrl}/users/credit?who=${who}`})
        .then(response => {
            if (response.data.length === 0) return sendMessageToSlack(data.channel, 'Srry, that user is not registered with us...');
            const [{ creditAvg }] = response.data;
            return sendMessageToSlack(data.channel, `Credit limit for ${(who === 'my') ? 'you': '<@'+who+'>'} is ${creditAvg}`);
        })
        .catch(err => {
            console.log(err);
        });
}

const change = (data) => {
    let method;
    const limit = data.limit;

    (data.who === 'global') ? method = 'PUT' : method = 'PATCH';
    if (method === 'PATCH') {
        axios({method: 'GET', headers, url: `${baseUrl}/users/info/${data.who}`})
            .then(response => {
                const { data: { _id: userId }} = response;
                return axios({method, headers, url: `${baseUrl}/users/${userId}`, data: { limit }});
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