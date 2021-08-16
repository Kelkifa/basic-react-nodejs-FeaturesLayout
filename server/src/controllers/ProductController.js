const productModel = require('../models/products');

class ProductController {
    /** [GET] /api/products
     *  get product list
     *  public
     */
    async index(req, res) {
        const { id } = req.query;
        console.log(id);
        try {
            if (!id) {
                const response = await productModel.find();
                return res.json({ success: true, message: 'successfully', response });
            }
            const response = await productModel.findOne();
            return res.json({ success: true, message: 'successfully', response });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Internal Server' });
        }
    }

}

module.exports = new ProductController;