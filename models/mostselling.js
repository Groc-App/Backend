// import 'mongoose';

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const mostsellingSchema = new Schema({
  Products: [{
    type: _Schema.Types.ObjectId,
    ref: 'Product',
  }],
});

const MostSelling = model("MostSelling", mostsellingSchema);

export default MostSelling;
