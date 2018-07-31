const register = {} //require('./register');
const limits = require('./limits');
const purchase = {} //require('./purchase');
const products = {} //require('./products');
const debt = {} //require('./debt');

const answerMessage = (body) => {
    const { text } = body.event;
    const { channel, user } = body.event;

    let data;
    switch(true) {
        case /^register/.test(text): {
            data = {
                username: body.event.user,
                password: text.split(':')[2],
                channel,
                user,
            }
            return register(data);
        }
        case /^show/.test(text): {
            data = {
                show: text.match(/my|global|\<@\w{9}\>/)[0],
                channel,
                user,
            }
            return limits.show(data);
        }
        case /^change/.test(text): {
            console.log('yes');
            data = {
                user,
                channel,
                who: text.match(/\<@\w{9}\>/)[0].substring(2,11) ||  text.match('global'),
                limit: text.match(/\d+$/)[0],
            }
            return limits.change(data);
        }
        case /^buy/.test(text): {
            data.list = text.split(/(\d+)/).splice(1).reduce((prev, cur) => {
                const test = Number(cur)
                if (!Number.isNaN(test)) product.quantity = Number(cur);
                if (Number.isNaN(test) && product.quantity) product.name = cur.trim();
                if (product.name && product.quantity) {
                    prev.push(product)
                    product = {}
                    return prev;
                }
                return prev;
            }, []);
            data.channel = channel;
            data.user = data.user;
            return purchase(data);
        }
        case /^add product/.test(text): {
            const info = text.match(/name:((\s)?[\w|\s]+)brand:((\s)?[\w|\s]+)price:(\s\d+)$/);
            data = {
                user,
                channel,
                name: info[1],
                brand: info[3],
                price: info[5],
            }
            return products.create(data);
        }
        case /^delete product/.test(text): {
            data = {
                user,
                channel,
            };
            return products.delete(data);
        }
        case /^show debt/.test(text): {
            data.what = text.split(' ')[2];
            data.user = user;
            data.channel = channel;
            return debt.show(data);
        }
        case /pays/.test(text): {
            const info = text.match(/^<@(.{9})> paid (\d*)/)
            data.who = info[1];
            data.amount = info[2];
            data.user = user;
            data.channel = channel;
            return debt.pay(data);
        }
        default: {
            return defaultMessage();
        }
    }
};

module.exports = answerMessage;