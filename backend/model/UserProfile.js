const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const userProfileSchema=new Schema({
    username:{type:String,ref:'User'},
    email:{type:String,ref:"User"},
    CreatedAt:{type:Date,ref:"User"},
    firstname:{type:String},
    lastname:{type:String},
    sex:{type:String,enum:['male','female','trans']},
    DOB:{type:Date},
    bio:{type:String,default:"Add something to show other users"},
    hometown:{type:String},
    profilePicURL:{type:String,default:"https://drive.google.com/file/d/1LguQD2Qi85GqUPZIycmmwEp9R5iClipP/view"},
    favoriteAnime:{type:String},
    favoriteGenres:[{type:String}],
    Top5anime:[{type:String}],
    lastlogin:{type:Date},
    SocialMedia:{
        Instagram:{type:String},
        Twitter:{type:String}
    }
});

module.exports=mongoose.model('UserProfile',userProfileSchema);