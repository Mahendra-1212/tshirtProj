const mongoose=require("mongoose");
const product=new mongoose.Schema(  {
    name:{
        type:String,
        required:[true,"name field is required"],
        maxlength:[120,"product name should not be more then 120 char"],
    },
    price:{
        type:Number,
        required:[true,"please provide price"],
        maxlength:[6,"product price should not be more then 6 digit "],
    },
    description:{
        type:String,
        required:[true,"please provide description"],
    },
    photos:[
        {
            id:{
                type:String,
                required:true
            },
            secure_url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"please select category for this list ( sortSleeves,longSleeves,sweatShirt,hoodies)"],
        enum:{
            values:[
                'sortSleeves','longSleeves','sweatShirt','hoodies'
            ],
            message:"please select category form this list ( sortSleeves,longSleeves,sweatShirt,hoodies"
        }
    },
    brand:{
        type:String,
        required:[true,"please add a brand for clothing"]
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'user',
                required:true
            },
            name:{
                tyep:String
            },
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date
    }

});
module.exports=mongoose.model("product",product);