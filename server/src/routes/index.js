const productRouter = require('./product');

function router(app) {
    app.use('/api', productRouter);
}

module.exports = router;