const axios = require('axios');
const { json } = require('express');
const serialPort = require('serialport')


  const GerarTicket = {
    imprimir: () => {
console.log("imprimindooo")
    
     const port4 = new serialPort("COM9")

     port4.on('open,', (err) =>{
       if(err) console.log(err)
       const imprimir = "tetando"
       port4.write(imprimir)
       port4.write(imprimir)
       port4.write(imprimir)


     })
    
      return true

    },

   GerarDatamaxi: async(numero) =>{

              //cria xml
        function novacomanda(numero){
          var builder = require('xmlbuilder'); 
          var xml = builder.create("DATAPACKET")
            .ele('METADATA')
              .ele('FIELDS')
              .ele('FIELD', {'WIDTH': '20','fieldtype':"string",'attrname':"ID_COMANDA"})
              .up()
              .ele('FIELD', {'WIDTH': '1','fieldtype':"string",'attrname':"EVENTO"})
              .up()
              .up()
              .ele('PARAMS',{'CHANGE_LOG':'1 0 4'})
              .up()
              .up()
            .ele('ROWDATA')
              .ele('ROW', {'EVENTO': 'V','ID_COMANDA':'11111110'+numero ,'RowState':"4"})
          
          
            .end({ pretty: true});
          
          console.log(xml);
          
          comanda =xml
          
          var fs = require("fs");
          
            fs.writeFile("./comandasXML/W_CMD0"+numero +".xml", comanda, (err) => {
              if (err) throw err;
              console.log('The file has been saved!');
            });
          
          }
          novacomanda(numero)
      
    },
    SaidaDatamaxi: async(numero) =>{
     // const id = req.params.id;
     
      ticket = numero.slice(-5)
      console.log(ticket);

          var C = 1
          var D =1
          var W = 1
          var S = 1
          var result ='inicio'
    
     
          var fs = require("fs");
          var convert = require('xml-js');
         
          //const config = fs.readFileSync("./Config.json" , "utf8", )
         // const config = fs.readFileSync("./comandasXML/C_" + numero + '.xml',"utf8", )
          if(!fs.existsSync('./comandasXML/C_' + ticket+ '.xml')) {
          C = ''
          }
          if(!fs.existsSync('./comandasXML/S_CMD' + ticket+ '.xml')) {
            S = ''
            }
            if(!fs.existsSync('./comandasXML/D_' + ticket+ '.xml')) {
              D = ''
              }
              if(!fs.existsSync('./comandasXML/W_CMD' + ticket+ '.xml')) {
                W = ''
                }

               if(D==1){
                result = 'LB'
               }else{
                 if(C ==1){
                   result = "NL"
                 }
                 else if(S == 1){
                   result = "UT"
                 }
               }

         
             return result

         // result = convert.xml2js(config, {compact: true, spaces: 4});
        
         // console.log(result.DATAPACKET.ROWDATA.ROW._attributes.EVENTO);

},

    Saida: async (req,res)=>{  
      const id = req.params.id;

      json2 = [
        {
        "mensagem": "100000-OK",
        "status": "VL"
        }
       ]
      
      console.log("deu Saida : " + id)

      return res.status(200).json({msg: "ok"})

    }

  }
  module.exports = GerarTicket;
