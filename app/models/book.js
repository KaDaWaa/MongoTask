const mongoose =require('mongoose');
const { model,Schema } = mongoose;

const bookSchema = new Schema({
    title:String,
    publishingYear:Number,
    geners:[String],
    authors:[{type:Schema.Types.ObjectId,ref:'Author'}],
    quantity:Number,
    price:Number
});

  const Book = model('Book', bookSchema);
  module.exports = Book;