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

    Gerar: async (req,res)=>{     
      /* Tratamento SQG

      http://ip_do_servidor /cancela-estacionamento/nome_do_servico
      Com o sucesso da emissão do ticket, o retorno será como abaixo:
        [
        {
        "mensagem": "100000-Ticket criado com sucesso.",
        "ticket": 32,
        "data": "2020-11-24 10:24:26"
        }
        ] */


      axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(function (response) {
        // handle success
        console.log(response.data);

      let Dadojson = [{          
        "mensagem": "100000-Ticket criado com sucesso.",
        "ticket": 32,
        "data": "2020-11-24 10:24:26"
        }]         
        
        console.log(Dadojson);      
        console.log("função imprime ticket")
        console.log("Ticket : " + Dadojson[0].ticket)
        console.log("data: " +  Dadojson[0].data)      

      })
      .catch(function (error) {
        console.log("Tratar erro de conexão")
        console.log(error);
      })
      .then(function (response) {
        // always executed
        //espaço para log
      });
    },

    Saida: async (req,res)=>{  
      const id = req.params.id;

      json = [
        {
        "mensagem": "100000-OK",
        "status": "VL"
        }
       ]
      
      console.log("deu Saida : " + id)

      return res.status(200).json(json.status)

    }

  }
  module.exports = GerarTicket;
