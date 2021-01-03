var express = require('express');
var router = express.Router();
const sqlite = require('sqlite-sync');


const Ticket = require("../controllers/imprimirCOM")
const configuracoes = require("../controllers/configuracoes")
const Promocoes = require("../controllers/promocoes")

const upload = require("../config/upload");

router.post('/adm/video' ,upload.any(), Promocoes.storeVideo)
router.delete('/adm/video/:id' , Promocoes.DeleteVideo)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/exit', function(req, res, next) {
  res.render('exit', { title: 'Saida' });
});

router.get('/inicial', function(req, res, next) {
  sqlite.connect('./database/database.sqlite');         
  let lista =''
   const dados = sqlite.run("SELECT * FROM configuracoes", function(rows){
       console.log(rows)
       lista = rows
   })
   sqlite.close();
   res.status(200).render("inicial", {
    lista,     
    title: 'Inicial' 
  }).json(lista) 


});

router.get('/adm/config', function(req, res, next) {
  sqlite.connect('./database/database.sqlite');         
  let lista =''
   const dados = sqlite.run("SELECT * FROM configuracoes", function(rows){
       console.log(rows)
       lista = rows
   })

   sqlite.close();
   res.status(200).render("admConfig", {
       lista,     
       title: 'Configurações' 
     }) 
});

/* router.get('/adm', function(req, res, next) {
  res.render('adm', { title: 'Administração' });
}); */
router.get('/adm',Promocoes.Lista);
router.get('/adm/listagem',Promocoes.ListaPromocoes);
router.get('/adm/buscavideo',Promocoes.GetVideo);
router.put('/adm/editapromocao/:id',Promocoes.Edit);
router.delete('/adm/deletapromocao/:id',Promocoes.Delete);
router.post('/adm/novapromocao',Promocoes.Send);


//router.get('/adm/promocoes',Promocoes.Lista)
router.get('/exit/:id', Ticket.Saida)


//rotas para configurações para
router.put('/adm/config/entrada',configuracoes.storeEntrada);
router.put('/adm/config/saida',configuracoes.storeSaida);
router.put('/adm/config/tempoVideo',configuracoes.storeTempoVideo);
router.put('/adm/config/tempoPromocoes',configuracoes.storeTempoPromocoes);
router.get('/adm/configs',configuracoes.lista);


module.exports = router;
