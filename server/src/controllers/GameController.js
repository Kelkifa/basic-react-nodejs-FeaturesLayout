const gameModel = require('../models/games');

class GameControlelr {
    /**[GET] /api/games
     * response all game imgs
     * public
     */
    async index(req, res) {
        try {
            const response = await gameModel.find({}).sort({ createdAt: 'desc' });
            return res.json({ success: true, message: 'successfully', response });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }

    /**[POST] /api/games 
     * store new game img
     * public
    */
    async storeImg(req, res) {
        const { img } = req.body;
        console.log(img);
        if (!img)
            return res.json({ success: false, message: 'bad request' });
        try {
            const newGame = new gameModel({ img });
            await newGame.save();
            return res.json({ success: true, message: 'successfully' });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' })
        }
    }
}

module.exports = new GameControlelr;