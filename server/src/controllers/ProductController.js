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
    /**[GET] /api/products/getById
     * Get product buy id for detail page
     * public
     */
    // async getOneById(req, res) {
    //     const { id } = req.body;
    //     console.log(id);
    //     if (!id)
    //         return res.status(404).json({ success: false, message: 'Bad Request' });
    //     try {
    //         const response = await productModel.findOne({ _id: id });
    //         return res.json({ success: true, message: 'successfully', response });
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(500).json({ success: false, message: 'Internal Server' });
    //     }
    // }

}

module.exports = new ProductController;