const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var mongoose_delete = require('mongoose-delete');

const games = new Schema(
    {
        img: { type: String }
    },
    {
        timestamps: true
    }
);
games.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('games', games);