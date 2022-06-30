const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const BlogSchema =new Schema({
    title:{
        type:String,
        unique:true,
        required:true,
    },
    user:{
        type:String,
        required:true,
    },
    related_title:{
        type:String
    },
    article_file_path:{
        type:String,
        unique:true,
        required:true
    },
    thumbnail_file_path:{
        type:String,
        required:false,
    },
    date:{
        type: Date,
        default:Date.now
    },
});
module.exports = Blog =mongoose.model('Blog',BlogSchema);

