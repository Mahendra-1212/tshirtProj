const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, "usre name is required"],
        maxlength: [40, "username should be lessthen 40 character"]
    },
    email: {
        type: String,
        required: [true, "email name is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password name is required"],
        minlength: [6, "password should be minimum 6 char"],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    photos: {
        id: {
            type: String,
            
        },
        url: {
            type: String,
            
        }
    },
    forgotPasswoadToken:{
        type:String
    },
    forgotPasswoadExpireDate:{
        type:Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

//encrypt password before save-hooks
userSchema.pre('save', async function (next) {

    if (!this.isModified()) return next();
    this.password = await bcrypt.hash(this.password, 10);

});

//user password validating

userSchema.methods.isValidatePassword = async function (userPassword) {
    return bcrypt.compare(userPassword, this.password);
}

//user jwt token varification
userSchema.methods.getJwt = async function (time) {
    return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: time||process.env.JWT_EXPIRE });
}

//forget password expire date

userSchema.methods.forgotPasswoadExpire = async function () {debugger;
 try{
    let randomStr =await crypto.randomBytes(45).toString('hex');
    this.forgotPasswoadToken =await crypto.createHash("sha256").update(randomStr).digest("hex");
    this.forgotPasswoadExpireDate = new Date(Date.now() + eval(process.env.FORGET_EXPIREDATE)) ;
    return randomStr;
 }catch(e){
     console.log(e);
     console.log("error in this function");
 }
}
module.exports = mongoose.model('user', userSchema);