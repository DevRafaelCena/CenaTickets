var path = require( 'path' );
const SerialPort = require('serialport')
var fs = require("fs");      


fs.readFile("./Config.json" , "utf8", function(err, data){
  if(err){
    return console.log("Erro ao ler arquivo");
  }
})


  var jsonData = JSON.parse(data); 
  console.log(jsonData.ENTRADA)

  const Readline = SerialPort.parsers.Readline;

var port = new SerialPort(jsonData.ENTRADA, {
  baudRate: 115200,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
})         

port.write('0;2;1;\r');