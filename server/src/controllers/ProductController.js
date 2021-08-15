class ProductController {
    /** [GET] /api/products
     *  get product list
     *  public
     */
    index(req, res) {
        res.json({ success: true, message: 'Product' })
    }
}

module.exports = new ProductController;