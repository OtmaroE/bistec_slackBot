const axios = require('axios');
const helper = require('./helper');
const { api_token, api_baseUrl } = process.env;

const create = (data) => {
    helper.logInGetToken(data.user)
    .then((token) => {
        const createProductBody = {
            "name": data.name,
            "price": Number(data.price),
            "brand": data.brand
        };
        createProductOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            data: createProductBody,
            url: api_baseUrl + '/api/products'
        };
        return axios(createProductOptions);
    })
    .then((response) => {
        helper.sendMessagetoSlack(data.channel, response.statusText);
    })
    .catch((err) => {
        helper.sendMessagetoSlack(data.channel, err.message);
    })
}

module.exports = {
    create
};
