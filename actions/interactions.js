const product = require('./products');

const answerInteraction = (payload) => {
    switch (payload.callback_id) {
        case 'product_selection': {
            return product.deleteProduct(payload)
        }
        default: {
            return defaultMessage(payload);
        }
    }
}
module.exports = answerInteraction;