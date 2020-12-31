var express = require('express');
var router = express.Router();

const Ticket = require("../controllers/imprimirCOM")
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
  res.render('inicial', { title: 'Inicial' });
});

router.get('/adm/config', function(req, res, next) {
  res.render('admConfig', { title: 'Configurações' });
});

/* router.get('/adm', function(req, res, next) {
  res.render('adm', { title: 'Administração' });
}); */
router.get('/adm',Promocoes.Lista);
router.get('/adm/listagem',Promocoes.ListaPromocoes);
router.put('/adm/editapromocao/:id',Promocoes.Edit);
router.delete('/adm/deletapromocao/:id',Promocoes.Delete);
router.post('/adm/novapromocao',Promocoes.Send);


//router.get('/adm/promocoes',Promocoes.Lista)
router.get('/exit/:id', Ticket.Saida)

module.exports = router;
