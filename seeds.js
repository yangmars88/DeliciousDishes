var mongoose=require("mongoose"),
    dish=require("./models/dish"),   //dish is databse model(yelp_camp)
    comment=require("./models/comment");
var author={
    username:"yangmars",
    id:"5b8814f0c422cc0ff949232f"
};
var data=[
    {name:"delicate desert",
     image:"http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1404/24/c0/33496086_1398278181542_mthumb.jpg",
     description:"very beautiful color and sweet taste!",
     author:author
    },
    {name:"Smiling Drinks",
     image:"http://picture.ik123.com/uploads/allimg/160808/4-160PQ10120.jpg",
     description:"very nice looking drinks and refreshful tastes !",
     author:author
    },
    {name:"Cranberry",
     image:"http://picture.ik123.com/uploads/allimg/160808/4-160PQ10113.jpg",
     description:"pumpkin and cranberrry pie!",
     author:author
    },
     {name:"Chocolate Cup Cake",
     image:"http://picture.ik123.com/uploads/allimg/160808/4-160PQ10119.jpg",
     description:"Chocolate Cup Cake with digestive color!",
     author:author
    },
     {name:"Bacon Longan",
     image:"http://www.sdmsw.com/uploadfiles/image/10225/TXT-20091283514407.jpg",
     description:"leaves bacon longan!",
     author:author
    },
    {name:"Totoro Chinchilla",
     image:"https://www.bomb01.com/upload/news/original/a3c3aaa384d4070a0b18835b6c39513f.png",
     description:"rice kelp green bean eggs!",
     author:author
    },
     {name:"Mugaritz",
     image:"https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2FHD-200905-ss-mugaritz.jpg&w=800&q=85",
     description:"A year's worth of experimentation went into Andoni Luis Aduriz's voluminous edible bubbles, made with sun-ripened berries and beetroot. The Michelin-two-starred Mugaritz was destroyed by a kitchen fire earlier this year, but Aduriz plans to reopen it this summer.",
     author:author
    },
     {name:"French Laundry",
     image:"https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2FFrench-Laundry-201208-ss-patti-stanger-date-night-restaurants-french-laundry.jpg&w=800&q=85",
     description:"This new dish by chef de cuisine Timonthy Hollingsworth at the renowned French Laundry combines carefully shaved frozen foie gras with pickled huckleberries and blossoms from the restaurant's garden!",
     author:author
    },
     {name:"El Bulli Roses",
     image:"https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Felbulli-201004-ss-el-bulli.jpg&w=800&q=85",
     description:"At the much-celebrated El Bulli on the Catalonian coast, Ferran Adria; continually pushes food boundaries with dishes like Snails on a Tin. Adria; surprised the food world earlier this year by announcing that he would close his restaurant in December 2011.",
     author:{username:"yangyang",
             id:"5b8ffbbe92523a251c0e324c"}
    },
     {name:"Le Bernardin",
     image:"https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Flebernardin-201004-ss-eric-ripert.jpg&w=800&q=85",
     description:"Seafood genius Eric Ripert juxtaposes the high and low in this playful dish of white tuna poached in olive oil, topped with delicate sea beans, crispy potato chips and a light red-wine béarnaise sauce.",
     author:{username:"yangyang",
             id:"5b8ffbbe92523a251c0e324c"}
    }
    ];
    
function seedDB(){
        //remove all dishes
        dish.remove({},function(err){
            if(err){
                console.log(err);
            }
            console.log("removed dishes");
            //add a few dishes, if move below creating process out of remove function, the executing sequence cannot be guarantted.
            data.forEach(function(seed){
            dish.create(seed,function(err,dish){
                if(err){console.log(err)}
                else{console.log("added a dish");
                    //create comment right after the dish was created
                    comment.create(
                        {text:"This dish is really tasteful, I will come eat again!",
                         author:author
                        },
                        function (err,comment) {
                            if(err){console.log(err);
                            }
                            else {dish.comments.push(comment);
                            dish.save();
                            console.log("Created new comment");
                        }
                       });
                }
            });
        });
    });
    }
    
module.exports=seedDB;  //to use all functions from other page in app.js, you have to use exports.