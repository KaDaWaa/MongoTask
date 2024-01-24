const Author=require('../models/author');

module.exports={
    createAuthor:async(author)=>{
        const newAuthor=new Author(author);
        return newAuthor.save();
    },
    updateAuthor:async(id,author)=>{
        return Author.updateOne({_id:id},author)
    }
}