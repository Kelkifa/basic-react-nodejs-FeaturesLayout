class CartController {
    /**[GET] /api/cart
     * Show list cart of user
     * loged
     */
    index(req, res) {

        return res.json({
            success: true,
            message: 'cart api'
        });
    }
}

module.exports = new CartController;