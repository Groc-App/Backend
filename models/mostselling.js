// import 'mongoose';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mostsellingSchema = new Schema({
  Products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
});

const MostSelling = mongoose.model("MostSelling", mostsellingSchema);

export default MostSelling

