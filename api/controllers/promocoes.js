const sqlite = require('sqlite-sync');

sqlite.connect('./database/database.sqlite'); 


let promocoes = {

    Lista: async (req, res) => {
        
       let lista =''
        const dados = sqlite.run("SELECT * FROM promocoes", function(rows){
            console.log(rows)
            lista = rows
        })
              
        res.status(200).render("adm", {
            lista,
            title: 'Administração' 
          }) 
    
      },
      ListaPromocoes: async (req, res) => {
        
        let lista =''
         const dados = sqlite.run("SELECT * FROM promocoes", function(rows){
             console.log(rows)
             lista = rows
         })
               
         res.status(200).json(lista)
     
       },
      Send: async (req, res) => {

        const {nome,titulo,produto,subproduto,valor} = req.body

        console.log(req.body)

        sqlite.insert("promocoes",{nome:nome, produto: produto, subproduto:subproduto, titulo:titulo, valor: valor}, function(res){
            if(res.error)
                throw res.error;
            else{   
            console.log('Savo com sucesso');
        } 
        });

        return res.status(200).json({msg: "Teste"})    
    
      },



}

module.exports = promocoes