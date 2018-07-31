const axios = require('axios');
const { logInGetToken, sendMessageToSlack } = require('./helper');
const { api_baseUrl } = process.env;

const pay = (data) => {
    let options = {};
    logInGetToken(data.user)
        .then((token) => {
            options = {
                method: 'POST',
                url: `${api_baseUrl}/api/payments`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                data: {
                    pay: Number(data.amount),
                },
            };
            return axios(options);
        })
        .then((result) => {
            return sendMessageToSlack(data.channel, `Done! $${result.data.amountPaid} discounted from <@${data.user}> debt`);
        })
        .catch(err => console.log(err));
}

module.exports = {
    pay,
};
