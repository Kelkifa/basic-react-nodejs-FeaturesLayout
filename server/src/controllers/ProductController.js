const productModel = require('../models/products');
const textareaDataToArray = require('../cores/textareaDataToArray');


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
    /** [GET] /api/products/adminGet
     * Get produdcts and deleted products
     * Private
     */
    async adminGet(req, res) {
        try {
            const [listResponse, trashResponse] = await Promise.all([
                productModel.find(),
                productModel.findDeleted()
            ])
            return res.json({ success: true, message: 'successfully', listResponse, trashResponse });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Internal Server' });
        }
    }

    /**[PATCH] /api/products/delete
     * Sort delete one or more products
     * private
     */
    async delete(req, res) {
        const { data } = req.body;
        console.log(data);
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
    /**[DELETE] /api/products/delete 
     * delete one or more products (can't restore)
     * private
    */
    async forceDelete(req, res) {
        const { data } = req.body;
        if (!data.length) return res.status(400).json({ success: false, message: 'bad request' });
        try {
            await productModel.deleteMany({ _id: { $in: data } });
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
        const { data } = req.body;
        if (!data.length) return res.status(400).json({ success: false, message: 'bad request' });

        try {
            await productModel.restore({ _id: { $in: data } });
            const response = await productModel.find({ _id: { $in: data } });

            return res.json({ success: true, message: 'successfully', response });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }

    }
    /**[POST] /api/products/add
     * Add new product
     * private
     */
    async add(req, res) {
        const { data } = req.body;
        console.log(data);


        if (!data) return res.status(400).json({ success: false, message: 'bad request' });

        try {
            // Process data
            const shapes = { name: textareaDataToArray(data.shapeNames), img: textareaDataToArray(data.shapeLinks) };
            const colors = { name: textareaDataToArray(data.colorNames), img: textareaDataToArray(data.colorLinks) };
            if (shapes.name.length !== shapes.img.length || colors.name.length !== colors.img.length)
                return res.status(400).json({ success: false, message: 'bad request' });

            const newData = {
                name: data.name,
                description: data.description,
                position: data.position,
                type: data.type,
                cost: parseInt(data.cost.replace('.', '')),
                img: textareaDataToArray(data.img),
                shapes,
                colors
            }
            const newProduct = new productModel(newData);
            await newProduct.save();

            return res.json({ success: true, message: 'successfully' });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }
    /**[PATCH] /api/products/sortDelete 
     * Sort delete product
     * private
    */
    async sortDelete(req, res) {
        const { data } = req.body;
        console.log(data);
        if (!data) return res.status(400).json({ success: false, message: 'bad request' });
        try {


            return res.json({ success: true, message: 'successfully' })
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }
    /**[GET] /api/products/getDelete
     * get deleted products
     * private
     */
    async getDelete(req, res) {
        try {
            const response = await productModel.findDeleted({});
            console.log(response);
            return res.json({ success: true, message: 'successfully', data: response });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }
}

module.exports = new ProductController;