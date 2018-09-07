var mongoose=require("mongoose");

var commentSchema=new mongoose.Schema({
    text:String,
    createdAt:{type:Date,default:Date.now},
    //inclue userID from user database to here, so the author will use userID instead of inputting everytime.
    author:{
        username:String,
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
            },
           }
});

module.exports=mongoose.model("comment",commentSchema);