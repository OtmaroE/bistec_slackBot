const axios = require('axios');
const helper = require('./helper');
const { api_token, api_baseUrl, bot_token } = process.env;
const productList = require('../interactiveJson/productList.json');

const create = (data) => {
    helper.logInGetToken(data.user)
    .then((token) => {
        const createProductBody = {
            "name": data.name,
            "price": Number(data.price),
            "brand": data.brand
        };
        const createProductOptions = {
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
};
const deleteProduct = (data) => {
    const options = {
        method: 'GET',
        headers: { 'Authorization': api_token },
        url: api_baseUrl + '/api/products'
    };
    axios(options)
    .then((response) => {
        if(!response.data[0] | !response.data[0].name)
            Promise.reject('There are not products to delete');
        producArray = response.data.map((element) => { 
                return {
                    'name': element.name, 
                    'id': element._id 
                }
            });
        productList[0].actions[0].options = [];
        for (let product of producArray){
            productList[0].actions[0].options.push({ 'text': product.name, 'value': JSON.stringify({ name: product.name, id: product.id }) });
        }
        return axios.get('https://slack.com/api/chat.postEphemeral', {
            params: {
                    token: bot_token,
                    channel: data.channel,
                    text: '',
                    user: data.user,
                    attachments: JSON.stringify(productList)
            }
        })
    })
    .then((response) => {
        console.log('axios post was received');
    })
    .catch((err) => {
        console.log(err);
    })
}
module.exports = {
    create,
    deleteProduct
};
