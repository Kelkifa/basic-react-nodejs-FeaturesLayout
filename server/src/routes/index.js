const productRouter = require('./product');
const cartRouter = require('./cart');
const authRouter = require('./auth');

const authMidleware = require('../midlewares/authMidleware');

function router(app) {
    app.use('/api/auth', authMidleware, authRouter);
    app.use('/api/carts', authMidleware, cartRouter);
    app.use('/api/products', productRouter);
}

module.exports = router;