const axios = require('axios');
const helper = require('./helper');
const { api_token, api_baseUrl } = process.env;

const create = (data) => {
    const body = {
        "name": data.name,
        "price": Number(data.price),
        "brand": data.brand
    };
    options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': api_token },
        data: body,
        url: api_baseUrl + '/api/products'
    };
    axios(options)
    .then((response) => {
        helper.sendMessagetoSlack(data.channel, response.statusText);
    })
    .catch((err) => {
        helper.sendMessagetoSlack(data.channel, err.message);
    });
}

module.exports = {
    create
};
