require('events').EventEmitter.defaultMaxListeners = 25
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//logica tickets for development

const Imprimir = require('./controllers/imprimirCOM');

var path = require( 'path' );
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')



var fs = require("fs");      
var com1 =''

const config = fs.readFileSync("./Config.json" , "utf8", )
console.log(config)
var jsonData = JSON.parse(config); 

com1 = jsonData



console.log(com1.ENTRADA)


//Conectando na ENTRADA 
if(com1.ENTRADA != ''){

 function Conecta(){
  const libera = '0;2;1;\r' 

  var port = new SerialPort(com1.ENTRADA, {
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    autoOpen:true
  })   
  const parser = port.pipe(new Readline({ delimiter: '\r' }))
   console.log('conectando COM ENTRADA ...')
    port.on('open',(err) => {
      if (err) {
        console.log("deu erro ao conectar COM ENTRADA: " + err)
        statusCom1 = 1
      }else{     
      port.write(libera)
      console.log('conectado COM ENTRADA')
          
    }});

    parser.on('data', function (data){
      console.log("recebeu algo COM ENTRADA : " + data )  
      if(data === '0;14;1;'){     
      Imprimir.Gerar()
      setTimeout(function(){
        port.write(libera)
      },3000) 
        
      }
    })  
    
  port.on('close', function(){
    console.log("COM ENTRADA desconectado")
    port.close(error => {console.log("COM ENTRADA : " +error)})
    Conecta()
  
  })
  
  port.on('error', (err) => {
    Conecta()
    console.log("COM ENTRADA desconectado : " + err)}
  )
  }

 Conecta()
 
}

if(com1.SAIDA != '') {
  erro = 1
  function ConectaSAIDA(){
    const libera = '0;1;1;\r' 
  
    var port2 = new SerialPort(com1.SAIDA, {
      baudRate: 9600,
      dataBits: 8,
      parity: 'none',
      stopBits: 1,
      flowControl: false,
      autoOpen:true
    })   
    const parser2 = port2.pipe(new Readline({ delimiter: '\r' }))
     console.log('conectando COM SAIDA ...')
     port2.on('open',(err) => {
        if (err) {
          console.log("Erro ao Conectar COM SAIDA : " + err)
          
        }else{     
        port2.write(libera)
        console.log('conectado COM SAIDA')
            
      }});
  
      parser2.on('data', function (data){
        console.log("recebeu algo COM SAIDA : " + data )  
       
      })  
      
    port2.on('close', function(){
      console.log("COM SAIDA : Desconectado")
      port2.close(error => {console.log("COM SAIDA : " +error)})
      ConectaSAIDA()  
    
    })
    
    
    port2.on('error', (err) => {
     
      ConectaSAIDA()      
      
        console.log("COM SAIDA desconectado : " + err)

    
     } )}
    
  
   ConectaSAIDA()

}
/* //const portaImpressora = new SerialPort('COM12')

var portaImpressora = new SerialPort('COM12', {
  baudRate: 115200  
})   
  
portaImpressora.on('open', (err) => {
  if(err) console.log("deu erro ao conectar : " + err)
  const imprimir = 'TeSTANDOOOOO'
  portaImpressora.write(imprimir)
}) */

module.exports = app;
