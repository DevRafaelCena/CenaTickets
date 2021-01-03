const axios = require('axios');
const { json } = require('express');

/* const escpos = require('escpos');
escpos.SerialPort = require('escpos-serialport');
const device = new escpos.SerialPort('COM12');

const options = { encoding: "GB18030" /* default */ // } */
// encoding is optional
/* 
const printer = new escpos.Printer(device, options);

let imprimir = device.open(function(error){
    printer
    .font('a')
    .align('ct')
    .style('bu')
    .size(1, 1)
    .text('The quick brown fox jumps over the lazy dog')
    .text('敏捷的棕色狐狸跳过懒狗')
    .barcode('1234567', 'EAN8')
    .table(["One", "Two", "Three"])
    .tableCustom(
      [
        { text:"Left", align:"LEFT", width:0.33, style: 'B' },
        { text:"Center", align:"CENTER", width:0.33},
        { text:"Right", align:"RIGHT", width:0.33 }
      ],
      { encoding: 'cp857', size: [1, 1] } // Optional
    )
    .qrimage('https://github.com/song940/node-escpos', function(err){
      this.cut();
      this.close();
    });
  }); */

  const GerarTicket = {
    imprimir: () => {
    
       console.log("Imprimindo...")
       return 

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
              .ele('ROW', {'EVENTO': 'V','ID_COMANDA':'11151110'+numero ,'RowState':"4"})
          
          
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
    SaidaDatamaxi: async(req,res) =>{
     // const id = req.params.id;

     
          var fs = require("fs");
          var convert = require('xml-js');
          //const config = fs.readFileSync("./Config.json" , "utf8", )
          const config = fs.readFileSync("./comandasXML/W_CMD0110.xml","utf8", )

          result = convert.xml2js(config, {compact: true, spaces: 4});
        
          console.log(result.DATAPACKET.ROWDATA.ROW._attributes.EVENTO);

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
