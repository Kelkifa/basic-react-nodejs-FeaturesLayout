const gameModel = require('../models/games');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

    /**[POST] /api/games/ 
     * store new game img
     * public
    */
    async addMany(req, res) {
        const { data } = req.body;

        if (!data.length)
            return res.json({ success: false, message: 'bad request' });

        try {
            const newImgs = data.map(value => { return { img: value } });
            await gameModel.create(newImgs);
            await sleep(1000);
            return res.json({ success: true, message: 'successfully' });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' })
        }
    }
}

module.exports = new GameControlelr;