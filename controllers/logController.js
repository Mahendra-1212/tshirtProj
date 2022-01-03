
const {debugLevelLog}=require("../utils/logHelper");
let logger=null;
if (process.env.NODE_ENV !== 'production') {
     logger=debugLevelLog();
  }

  module.exports=logger;