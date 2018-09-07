var express=require("express");
var router=express.Router({mergeParams:true});
var comment=require("../models/comment");
var dish=require("../models/dish");
var user=require("../models/user");
var middleware=require("../middleware/index.js");

router.get("/dishes/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    dish.findById(req.params.id, function(err,founddish){
        if(err){console.log(err);}
        else{
            res.render("./comments/new",{dish:founddish});
        }
    });
   
});


router.post("/dishes/:id/comments", middleware.isLoggedIn,function(req,res){
    dish.findById(req.params.id, function(err, founddish) {  //has to remember "founddish" is the dish found by ID, so all below dish need to use "founddish" to represent
      if(err){console.log(err); res.redirect("/dishes");}
      else{
          
          //right now ,when creating, comment only have text, the author:id and author:username are empty
          comment.create(req.body.comment, function(err,newComment){
              if(err){console.log(err);}
              else{
              //have to assign the user.id and user.username to comment author, so the comment data record complete.
              newComment.author.id=req.user._id;
              //have to remember: use newComment from function, not use comment!!!
              newComment.author.username=req.user.username;
              newComment.save();
              
              founddish.comments.push(newComment);      //even push the whole comment, comments will just take the id
              founddish.save();                              //in here, has to use founddish.save
              res.redirect("/dishes/"+founddish._id);}       //in here, has to use founddish._id
          });
      }
    });
});

//comment edit route
//because before we come to comments route, we already have an variable :id to represent dish ID, so here has to use new variable: comment_id.
router.get("/dishes/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req,res) {
    //when we come to this route, we must have an dish id already in the req. 
    //in the comments/edit form, we need dish.id, so has to pass dish id from req to edit form.
    //in the edit form, we also need comment.id, so need to pass in too.
    comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){res.redirect("back")}
        else {res.render("./comments/edit",{dish_id:req.params.id, comment:foundComment})}
    });
   
});



//comment update route
router.put("/dishes/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req,res) {
    
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment) {
        if(err) {res.send("back")}
        else{
            res.redirect("/dishes/"+req.params.id);
        }
        
    });
});


//comment delete route
router.delete("/dishes/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req,res) {
    comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err){res.redirect("back")}
        else{
            res.redirect("/dishes/"+req.params.id);
        }
    });
});





module.exports=router;