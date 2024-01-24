const mongoose =require('mongoose');
const { model,Schema } = mongoose;

const authorSchema = new Schema({
    name:String,
    country:String
  });

  const Author = model('Author', authorSchema);
  module.exports = Author;