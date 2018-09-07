var mongoose=require("mongoose");

//schema setup
var dishSchema = new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    location:String,
    lat:Number,
    lng:Number,
    createdAt:{type:Date, default:Date.now},
    description:String,
    author:{
        username:String,
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
           },
           
    comments:[{      //comments should be an array to save multiple comments.
        type:mongoose.Schema.Types.ObjectId,   //just save the comments ID in here.
        ref:"comment"
    }]   
});
 
module.exports= mongoose.model("dish",dishSchema);

//A module is a part or a component.
//A model is something that represents or illustrates the real thing( like variable).