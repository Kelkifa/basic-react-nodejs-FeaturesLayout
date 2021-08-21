const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const games = new Schema(
    {
        img: { type: String }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('games', games);