const bigpromise=require("../middlewares/bigPromise");

exports.home=bigpromise(async (req,res)=>{

    res.status(200).json({
        status:"success",
        greeting:"wellcome to honme-page"
    });
});

exports.homedummy=(req,res)=>{
    res.status(200).json({
        status:"success",
        greeting:"this is a dummy home route for checking"
    });
}