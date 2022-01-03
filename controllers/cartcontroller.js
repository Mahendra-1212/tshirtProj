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