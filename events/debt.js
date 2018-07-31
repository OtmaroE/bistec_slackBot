const axios = require('axios');
const { logInGetToken, sendMessageToSlack } = require('./helper');
const { api_baseUrl } = process.env;
const headers = {
    'Content-Type': 'application.json',
}
const pay = (data) => {
    let options = {};
    logInGetToken(data.user)
        .then((token) => {
            headers.Authorization = token;
            options = {
                method: 'POST',
                url: `${api_baseUrl}/api/payments`,
                headers,
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

const show = (data) => {
    const url = `${api_baseUrl}/api/purchases${(!data.detailed) ? '/debt' : ''}`;
    const options = {
        method: 'GET',
        url,
    };
    logInGetToken(data.user)
        .then((token) => {
            headers.Authorization = token;
            options.headers = headers;
            return axios(options);
        })
        .then((response) => {
            const { data: list } = response;
            if (!data.detailed) return sendMessageToSlack(data.channel, `Your debt: $${list.debt}`);
            if (list.length === 0) return sendMessageToSlack(data.channel, 'No debts for you mai frend');
            let responseStr = '';
            list.forEach(element => {
                responseStr += `-> Product: ${element.Product}; Items: ${element.items}; Total: ${element.total} \n`;
            });
            return sendMessageToSlack(data.channel, responseStr);
        })
};

module.exports = {
    pay,
    show,
};
