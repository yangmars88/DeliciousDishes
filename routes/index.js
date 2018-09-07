var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");


router.get("/", function(req, res){
    res.render("landing");
});

router.get("/register", function(req, res){
res.render("./user/register");
});

router.post("/register", function(req,res){
var newUser=new User({username:req.body.username});                //username is just first field in userSchema
User.register(newUser, req.body.password, function(err,user){      //register function will check if there are duplicate data, if not, will save data to Database: User
if(err){req.flash("error", err.message); return res.render("./user/register");}
passport.authenticate("local")(req,res, function(){   
req.flash("signUp","Welcom to Delicious Dishes ");
res.redirect("/dishes");
});
});
});


//this one will take to login page, and will redirect to post: /login page after input login data
router.get("/login", function(req, res) {
    res.render("./user/login");
});

//below post method will take login info and use passport.authenticate to compare with database, if match, go to index page, if not, go to login
router.post("/login", passport.authenticate("local",{
    successRedirect:"/dishes",
    failureRedirect:"/login"
}),
function(req, res) {
    //in login post page, we just verify if match or not, so put nothing in this function.
});

router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success", "logged you out");
    res.redirect("/dishes");
});



module.exports=router;