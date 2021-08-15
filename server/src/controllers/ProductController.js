
const verifyIdToken = require('../cores/authVerify');

class ProductController {
    /** [GET] /api/products
     *  get product list
     *  public
     */
    async index(req, res) {

        // console.log('Request header: ', req.header('Authorization'));
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];

        try {
            const decodedToken = await verifyIdToken(token);
            console.log(decodedToken);

        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: 'internal sever' });
        }

    }
}

module.exports = new ProductController;