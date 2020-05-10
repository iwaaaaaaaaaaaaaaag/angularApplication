const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const ProductSchema = new Schema({
  //author: ObjectId,
  coverImage: String,
  name: { type:String, requied:true, max:[60,'最大60文字までです'] },
  price: Number,
  name: String,
  description: String,
  heading1: String,
  heading2: String,
  heading3: String
})

module.exports = mongoose.model('product',ProductSchema)