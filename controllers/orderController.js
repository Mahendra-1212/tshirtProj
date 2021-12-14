const Bigpromise=require("../middlewares/bigPromise");
const Product=require("../models/productModel");
const Order=require("../models/orderModel");
const mongoose=require("mongoose");
var ObjectId = require('mongodb').ObjectID;
exports.createOrder=Bigpromise(async (req,res,next)=>{debugger;
   const {
    address,
    city,
   phoneNo,
   postalCode,
    state,
   country,
   quantity,
   productids1
    }=req.body;

    const orderObj={
        shippingInfo:{
            address,
            city,
            phoneNo,
            postalCode,
            state,
            country
        }
    };

   let productids=eval(productids1)||[];
    projectObj=[];
    let totalAmount=0;
    let taxmaount=0
    for(let i=0;i<productids.length;i++){
        let temp=await Product.findById(new ObjectId(productids[i]));
        let obj={};
        obj.name=temp.name;
        obj.image=temp.photos[0].secure_url;
        obj.price=temp.price;
        obj.product=temp._id;
        totalAmount=totalAmount+temp.price;
        projectObj.push(obj);
    }
    if(projectObj.length==0){
        res.status(400).json({
            status:"failed",
             msg:"Product is not exist"
        });
    }
    orderObj.orderItems=projectObj;
    orderObj.totalAmount=totalAmount;
    orderObj.shopingAmount=totalAmount;
    orderObj.taxAmount=taxmaount;
    orderObj.deliveredAt=getDeliverDate();
    orderObj.user=req.user._id;

  const order=await Order.create(orderObj);
  res.status(200).json({
      status:"success",
      orderObj
  });

});

exports.getOrder=Bigpromise(async (req,res,next)=>{
     const id=req.params.id;
     const order=await Order.findOne({_id:id}).populate("orderItems.product");
     if(!order){
        res.status(400).json({
            status:"failed",
            msg:"there is no order"
        });
     }
     res.status(200).json({
         status:"success",
         order
     });
    });

function getDeliverDate(){
    return Date.now();
}