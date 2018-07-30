const axios = require('axios');
const { bot_token } = process.env;

const show = (data) => {
    const params = {
        token: bot_token,
        channel: data.channel,
        text: data.show,
    }
    return axios.get('https://slack.com/api/chat.postMessage', {params}).then(response => {
        return console.log(response.data);
    });
}

const change = (data) => {
    console.log(data);
}

module.exports = {
    show,
    change,
};