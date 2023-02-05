// import 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
    },
    products: [{
        type: Schema.ObjectId,
        ref: 'Product',
    }],
    imageUrl: String

},
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.categoryId = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
