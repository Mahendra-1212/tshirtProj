const bigpromise = require("../middlewares/bigPromise");
const cartmodel = require("../models/cartModel");
const productModel = require("../models/productModel");
const logger = require("../controllers/logController");
exports.addProduct = bigpromise(async (req, res, next) => {debugger
    logger.info("addProduct method called");
    const ProductId = req.query.id;
    const email = req.user.email;
    logger.info(`get data from clien ${ProductId} ${email}`);
    logger.info(`finding product with user data`);
    const product = await productModel.findById({
        _id: ProductId
    });
    if (!product) {
        logger.error(`product not found`);
        return new Error("product not found");
    }
    logger.info(`product found ${product}`);
    const cart = await cartmodel.findOne({
        email
    }).populate();
    let cartres = undefined;
    if (!cart) {
        logger.info("there is now cart for this user,so creating a new cart");
        cartres = await cartmodel.create({
            email,
            products: [{
                product: product._id
            }]
        });

        logger.info(`new cart created for ${email} and responce is : ${cartres}`);
        return res.status(200).json({
            status: "success",
            cartres
        });
    }
    let flag = false;
    cart.products.find((obj) => {
        if (obj.product._id == ProductId) {
            obj.count++;
            flag = true;
        }
    });
    if (!flag) {
        cart.products.push({
            product: ProductId
        });

    }

    cartres= await cart.save();
logger.debug(`cart updated successfully and result is ${cartres}`);
res.status(200).json({
    status:"success",
    cartres
});

});

exports.deleteCartProd=bigpromise(async(req,res,next)=>{
logger.info("deleteCartProd method product is called");
const email=req.user.email;
const productId=req.query.id;
logger.info(`get information ${email} ${productId}`);
let cartDt=await cartmodel.findOne({email});
logger.info(`query findOne is called and get object ${cartDt}`);
if(!cartDt){
 return res.status(200).send("cart is empty");
}
cartDt.products.forEach(function(obj,index){
    if(obj.product._id==productId){
        cartDt.products.splice(index,1);
    }
});
logger.info(`respective cart data was deleted and now cart is ${cartDt}`);
const response=cartDt.save();
logger.info(`cart data saved in database`);
res.status(200).json({
   status:"success",
   response
});
       
});

exports.getAllCartData=bigpromise(async(req,res,next)=>{
    logger.info("getAllCartData is called ");
    const email=req.user.email;
    logger.info(`get user information  ${email}`);
    const cartDt=await cartmodel.findOne({email}).populate("products.product");
    logger.info(`run findOne method for user and get Info ${cartDt}`);
    if(!cartDt){
        return res.status(200).send("empty!");
    }
    res.status(200).json({
        status:"success",
        cartDt
    });

});