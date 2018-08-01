const axios = require('axios');
const confirmProductDeletion = require('../interactiveJson/confirmProductDeletion.json');
const { api_baseUrl } = process.env;

const showproducts = (payload) => {
    const selectedProduct = JSON.parse(payload.actions[0].selected_options[0].value);
    confirmProductDeletion.attachments[0].actions[1].value = JSON.stringify(selectedProduct);
    confirmProductDeletion.text = `About to delete ${selectedProduct.name}`
    const options = {
        method: 'POST',
        header: { 'Content-type': 'application/json' },
        data: confirmProductDeletion,
        url: payload.response_url
    };
    axios(options)
    .then((response) => {
        console.log('response');
    })
    .catch((err) => {
        console.log('error');
    })
}
const deleteProduct = (payload) => {
    const selectedProduct = JSON.parse(payload.actions[0].value);
    const options = {
        method: 'DEL',
        url: api_baseUrl + '/api/products/' + selectedProduct.id
    }
    axios(options)
    .then((response) => {
        const options = {
            method: 'POST',
            header: { 'Content-type': 'application/json' },
            data: {  }
        }
    })
    .catch((err) => {

    })
}
module.exports = {
    showproducts,
    deleteProduct
}