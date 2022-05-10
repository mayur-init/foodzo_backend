const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const productSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    imgUrl: {type:String, required:true},
    price: {type:Currency, required:true, min:0},
    isVeg: {type: Boolean, required: true},
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps:true });

module.exports = mongoose.model('Product', productSchema);
