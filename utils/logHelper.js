const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint,printf } = format;
const path=require("path");
const loggerFilePath=path.join(__dirname,"../logs/logger.log");
const myFormat=printf(({level,timestamp,message})=>{
    return `[${level}]: ${timestamp} ${message}`;
});

const debugLevelLog=()=>{
 return createLogger({
     level:"info",
    format: combine(
      label({ label: 'right meow!' }),
      timestamp(),
      myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename:loggerFilePath})
    ]
  })
}
module.exports= { debugLevelLog};