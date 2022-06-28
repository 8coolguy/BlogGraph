const mongoose =require('mongoose');
const Schema =mongoose.Schema;

//create schema
const UserSchema = new Schema({
    userName: {
        type:String,
        required:true,
        unique:true,
    },
    total_blogs:{
        type:Number,
        required:true,
    },
    date_created:{
        type: Date,
        default:Date.now
    }
});

module.exports = User = mongoose.model('user',UserSchema);