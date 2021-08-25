const productModel = require('../models/products');

class ProductController {
    /** [GET] /api/products
     *  get product list
     *  public
     */
    async index(req, res) {
        const { id } = req.body;
        console.log(req.body);
        try {
            if (!id) {
                const response = await productModel.find();
                return res.json({ success: true, message: 'successfully', response });
            }
            const response = await productModel.findOne({ _id: id });
            return res.json({ success: true, message: 'successfully', response });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Internal Server' });
        }
    }

    /**[PATCH] /api/products/delete
     * Delete one or more products
     * private
     */
    async delete(req, res) {
        const { data } = req.body;
        console.log(`[PRODUCT]`, data);
        if (!data.length)
            return res.status(400).json({ success: false, message: 'bad request' });
        try {
            await productModel.delete({ _id: { $in: data } });
            return res.json({ success: true, message: 'successfully', response: data });
        }
        catch (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }

    /**[PATCH] /api/product/restore 
     * Restore products
     * private
    */
    async restore(req, res) {
        try {
            await productModel.restore();
            return res.json({ success: true, message: 'successfully' });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }

    }
}

module.exports = new ProductController;