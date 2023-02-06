// import 'mongoose';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mostsellingSchema = new Schema({
  Products: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
  },
});

const MostSelling = mongoose.model("MostSelling", mostsellingSchema);

module.exports = MostSelling;
