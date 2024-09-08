const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const ratingSchema=new Schema({
    username: {type: String,ref:'User',required: true},
    animeId:{type:String,required:true},
    rating:{
        type:Number,
        required:true,
        min: [1, 'Rating must be at least 1'], 
        max: [10, 'Rating must be at most 10'] 
    },
    review:{type:String},
    reviewedAt:{type:Date,default:Date.now}
});

module.exports=mongoose.model('rating',ratingSchema);