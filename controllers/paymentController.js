const Bigpromise=require("../middlewares/bigPromise");
const Razorpay = require("razorpay");
exports.getRazpayPublickey=Bigpromise(async (req,res,next)=>{
    
    res.status(200).json(
        {
            status:"success",
            publickey:process.env.RAZORPAY_PUBLIC_KEY
        }
    );
});

exports.captureRazPayment=Bigpromise(async (req,res,next)=>{

    const {amount}=req.body;
    var instance = new Razorpay({ key_id:process.env.RAZORPAY_PUBLIC_KEY, key_secret:process.env.RAZORPAY_SECRET_KEY});
    const options={
        amount: amount,
        currency: "INR",
        receipt: "receipt#1"
      };
      const myorder= await instance.orders.create(options);
      res.status(200).json({
        success:true,
        order:myorder
    });
});