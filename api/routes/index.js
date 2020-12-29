var express = require('express');
var router = express.Router();

const Ticket = require("../controllers/imprimirCOM")

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


router.get('/exit/:id', Ticket.Saida)

module.exports = router;
