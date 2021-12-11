const Bigpromise=require("../middlewares/bigPromise");
//const User=require("../models/userModel");
const cloudinary=require("cloudinary").v2;
const Product=require("../models/productModel");
const WhereClause=require("../utils/whereClause");

exports.addProduct=Bigpromise(async (req,res,next)=>{
    if(!req.files){
        res.status(401).json({
            status:"failed",
            msg:"files require"
        });
    }
    let imageArray=[];
    for(let i=0;i<req.files.photos.length;i++){
       let result=await cloudinary.uploader.upload(req.files.photos[i].tempFilePath,{
           folder:"products"
       });
       imageArray.push({
           id:result.public_id,
           secure_url:result.secure_url
       });
    }

    req.body.photos=imageArray;
    req.body.user=req.user.id;debugger;
    const product=await Product.create(req.body);
    res.status(200).json({
        status:"success",
        result:product
    });
});

exports.getAllProducts=Bigpromise(async (req,res,next)=>{

    let resultPerPage=6;
    const productsObj=new WhereClause(Product.find(),req.query).search().filter();
    const filterProductNumber=await productsObj.base.clone();
    productsObj.pager(resultPerPage);
    products=await productsObj.base.clone();
    res.status(200).json({
        status:"success",
        products
    })
});


exports.getOneProduct=Bigpromise(async (req,res,next)=>{debugger;

    const product= await Product.findById(req.params.id);
    if(!product){
       res.status(401).json({
           status:"failed",
           msg:"please provide valid product details"
       })
    }
    res.status(200).json({
        status:"success",
        product    });

});



exports.updateProduct=Bigpromise(async (req,res,next)=>{
    const product= await Product.findById(req.params.id);
    if(!product){
       res.status(401).json({
           status:"failed",
           msg:"please provide valid product details"
       })
    }
    if(req.files){
      for(let i=0;i<product.photos.length;i++){
          await cloudinary.uploader.destroy(product.photos[i].id);
      }
      var arr=[];
      for(let i=0;i<request.files.length;i++){
         let result = await cloudinary.uploader.upload(request.files.photos[i].tempFilePath,{folder:"products"});
          arr.push({
            id:result.public_id,
            secure_url:result.secure_url
        });

        }

         req.body.photos=arr;
    }
   const result1= await Product.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).send({
        status:"success",
        result1
    });
});


exports.deleteProduct=Bigpromise(async (req,res,next)=>{
    const product= await Product.findById(req.params.id);
    if(!product){
       res.status(401).json({
           status:"failed",
           msg:"please provide valid product details"
       })
    }
    if(req.files){
      for(let i=0;i<product.photos.length;i++){
          await cloudinary.uploader.destroy(product.photos[i].id);
      }
    }
   const result1= await Product.findByIdAndDelete(req.params.id);

    res.status(200).send({
        status:"success",
        result1
    });
});


exports.updateReviews=Bigpromise(async (req,res,next)=>{debugger;
      const {rating,comment,productid} = req.body;
      const product=await Product.findById(productid);
      if(!product){
        res.status(401).json({
            status:"failed",
            msg:"please provide valid product details"
        });
     }
     const oldreviews=product.reviews||[];
     var review=oldreviews.filter(function(obj){
         return obj.user.toString()==req.user.id.toString();
     });

     if(review.length>0){
        product.reviews.forEach(function(obj,index){
            if(obj.user.toString()==req.user.id.toString()){
                product.reviews[index].name=req.user.name,
                product.reviews[index].comment=comment ||  product.reviews[index].comment,
                product.reviews[index].rating=Number(rating)  ||  product.reviews[index].rating
            }
        })

     }else{
         product.reviews.push({
             user:req.user.id,
             name:req.user.name,
             comment:comment||"",
             rating:Number(rating)||0
         });
     }

     await product.save();
     res.status(200).send({
         status:"success"
     })
    
});

exports.deleteReview=Bigpromise((req,res,next)=>{
       const {productid}=req.body.productid;

});

