const mongoose=require("mongoose");

const cartSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    products:[
        {
            product:{
                type:mongoose.Schema.ObjectId,
                 ref:"product"
            },
            count:{
                type:Number,
                default:1
            }
        }
    ],
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('cart',cartSchema);
