const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var mongoose_delete = require('mongoose-delete');

const products = new Schema(
    {
        name: { type: String },
        description: { type: String },
        cost: { type: Number, require },
        position: { type: String },
        img: [String],
        shapes: [String],
        colors: [String],
        shapeLinks: [String],
        colorLinks: [String],
        likes: { type: Number, min: 0, default: 0 },
        sold: { type: Number, default: 0 },
        type: { type: String, default: 'tiện ích' }, //
    },
    {
        timestamps: true
    }
);
products.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('products', products);