var express=require("express"),
     app=express(),
     bodyParser=require("body-parser"),
     mongoose=require("mongoose"),  //Mongoose is a JavaScript framework which commonly used in a Node.js application with a MongoDB database.
    // dish=require("./models/dish"),  //in ejs: partials at same level as index, don't need ./, but in js: model at same level as app.js, need ./
    // seedDB=require("./seeds"),
    // comment=require("./models/comment"),
  
     //v6 new added
     passport=require("passport"),
     LocalStrategy=require("passport-local"),
     User=require("./models/user"),
     
       //v7 added
       commentRoutes=require("./routes/comments"),
       dishRoutes=require("./routes/dishes"),
       indexRoutes=require("./routes/index");
        
       //v10
       var methodOverride=require("method-override");
       //v11 
       var flash=require("connect-flash");
       
//seedDB();  //this is a function from seeds.js module.

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));  //__dirname will be the directory where public stays: environment/YelpCamp/v5 

app.use(methodOverride("_method"));
app.use(flash());

app.locals.moment = require('moment');
 //passport configuration
 //Session 能够标记客户端在服务器上的状态。利用这一点，我们能够实现客户端的登录验证。
 //Session 登录验证的流程大致为：客户端若在未登录的状态下请求主页，那么服务器将该请求重定向到登录页面；
 //客户端在登录后，服务器需要记录保存该客户端的登录状态，并给予一个活动期限，这样下一次服务器请求主页的时候，就能够判断该客户端的登录状态，
 //若登录状态有效，直接返回客户端需要的页面，否则重定向到登录页面。对于 Session 的过期时间，
 //如果没有设置 Session 的过期时间，服务器会根据自己配置中默认有效期，将长期不与服务器交互的 Session 进行删除。
 app.use(require("express-session")({
     secret:"once again I win",
     resave:false,
     saveUninitialized: false
 }));
 

 
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new LocalStrategy(User.authenticate()));  //this one called: middleware. will be used to verify if the login data match with database saved data.
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());
 
 
 //this function need to put behind passport configuration, including: express-session and passport declaration.
//put req.use to currentUser, which then can be used for all modules in this application.
app.use(function(req, res, next) {
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    res.locals.signUp=req.flash("signUp");
    next();
}); 
 

app.use(indexRoutes);
app.use(dishRoutes); 
app.use(commentRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The YelpCamp Server has started!");
});