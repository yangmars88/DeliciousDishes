var express=require("express");
var router=express.Router();
var dish=require("../models/dish");        //dishes.js in routes folder, need to go back to routes level, then go to models.
var geocoder   = require("geocoder");
//var multer     = require('multer');
//v10 added
var middleware=require("../middleware/index.js");

//index route   currentUser will have a value if there is logged in information, if not, it will be undefined.
router.get("/dishes", function(req,res){
   dish.find({},function (err,allDishes) {
       if(err){
           console.log(err);
       }
       else{
           res.render("./dishes/index",{dishes:allDishes});
       }
   });
        
});

//this post function will get the data sent over from /new page, 
//so we need to grab them through name attributes and put into database and at the end redirect back to dishes page.

router.post("/dishes",middleware.isLoggedIn, function(req, res){
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var description=req.body.description;
    //the order of author elements must be the same as the schema defined!!!
    var author={
        username:req.user.username,
        id:req.user._id
    };
    // geocoder for Google Maps
    geocoder.geocode(req.body.location, function(err, data) {
      if (err) {throw err}
      var lat = data.results[0].geometry.location.lat,
          lng = data.results[0].geometry.location.lng,
          location = req.body.location;
    var newdish={name:name, price:price, image:image, location: location, lat: lat, lng:lng, description:description, author:author };  //newdish is an object, so need to use curve bracket, and need to have fields and values.
    //console.log(req.user.username);
   //add this new data into database through mongoose model: dish. and the .create will add this newdish to datase.
   dish.create(newdish, function(err, newlyCreated){     //newlyCreated is a given variable name for newdish
       if(err){req.flash("error","the dish cannot be created")}
       else {
           //console.log(newlyCreated);
           res.redirect("/dishes");}
   });
    });
});


//router.get("/dishes/new") should grab the data obtained from this page and send to post page
//use isLoggedIn to check if session in loggedin status, if not, cannot go to function(req,res), have to go login first.

router.get("/dishes/new",middleware.isLoggedIn, function(req, res) {
    res.render("./dishes/new");  //all ejs file are in views, so don't need to include file name: views
});

//show route  (:id means id is an variable, unless you pass the real ID in here, have to use ":" )
router.get("/dishes/:id",function(req, res) {
    dish.findById(req.params.id).populate("comments").exec(function(err, foundDish){ //foundDish is the variable which contain dish information found by ID
        if(err){
            console.log(err);
        }
        else{
            res.render("./dishes/show",{dish:foundDish});
        }
    });
    
});

//edit dish route (get)
router.get("/dishes/:id/edit", middleware.checkDishOwnership, function(req, res) {
   dish.findById(req.params.id,function(err,foundDish){
       if(err){req.flash("error","dish not found")}
   res.render("./dishes/edit",{dish:foundDish});  //the foundDish is the variable for dish.findById(), the dish is the variable will be pash into edit form.  
});
   });

//update dish route (put)
router.put("/dishes/:id", middleware.checkDishOwnership, function(req,res) {
   dish.findByIdAndUpdate(req.params.id, req.body.dish,function(err,updateDish){
       if(err){res.redirect("/dishes")}
       else{
           res.redirect("/dishes/"+req.params.id);
       }
   });
});


//destory route
router.delete("/dishes/:id",middleware.checkDishOwnership,function(req,res){
    dish.findByIdAndRemove(req.params.id,function(err){
        if(err){res.redirect("/dishes")}
        else{
            res.redirect("/dishes");
        }
    });
});


//middleware will go to middleware folder



module.exports= router;