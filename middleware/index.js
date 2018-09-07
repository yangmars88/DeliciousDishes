var dish=require("../models/dish");
var comment=require("../models/comment");
var flash=require("connect-flash");
var middlewareObj={};

middlewareObj.checkDishOwnership= function (req,res,next){
     if(req.isAuthenticated()){     //is logged in?
       dish.findById(req.params.id,function(err,foundDish){
       if(err|| !foundDish) {
           req.flash("error","the dish is not found");
           res.redirect("back");
       }
       else {   //if so, is the current user id match the dish.author.id?
           if(foundDish.author.id.equals(req.user._id)||req.user.isAdmin)  //author.id is string, req.user_id is object.
           {
             next();
           }
           else{
                req.flash("error","You don't have permission to do so");
                res.redirect("back");
           }
       }
    });
    }
    else {
        req.flash("error","Please log in first");
        res.redirect("back");
    }
      
      
    
};


middlewareObj.checkCommentOwnership=function (req,res,next){
     if(req.isAuthenticated()){     //is logged in?
       comment.findById(req.params.comment_id,function(err,foundComment){
       //console.log(foundComment.author.id); 
       if(err|| !foundComment) {req.flash("error","the comment doesn't exist");
                                res.redirect("back");}
       else {   //if so, is the current user id match the dish.author.id?
       console.log(foundComment.author.id);
       console.log(req.user._id);
           if(foundComment.author.id.equals(req.user._id)||req.user.isAdmin)  //author.id is string, req.user_id is object.
           {
             next();
           }
           else{
                req.flash("error","You don't have permission to do so");
                res.redirect("back");
           }
       }
    });
    }
    else {
        req.flash("error","Please log in first");
        res.redirect("back");
    }
};


middlewareObj.isLoggedIn =function (req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please log in first");
    res.redirect("/login");
} ;


module.exports=middlewareObj;