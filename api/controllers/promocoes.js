const sqlite = require('sqlite-sync');


let promocoes = {

    Lista: async (req, res) => {
        sqlite.connect('./database/database.sqlite'); 
        
       let lista =''
       let video =''
        const dados = sqlite.run("SELECT * FROM promocoes", function(rows){
            console.log(rows)
            lista = rows
        })
        const dados2 = sqlite.run("SELECT * FROM arquivos", function(rows2){
            console.log(rows2)
            video = rows2
        })       
        sqlite.close();
        res.status(200).render("adm", {
            lista,
            video,
            title: 'Administração' 
          }) 
    
      },
      ListaPromocoes: async (req, res) => {
        sqlite.connect('./database/database.sqlite'); 
        let lista =''
         const dados = sqlite.run("SELECT * FROM promocoes", function(rows){
             console.log(rows)
             lista = rows
         })
         sqlite.close();
         res.status(200).json(lista)
     
       },
      Send: async (req, res) => {
        sqlite.connect('./database/database.sqlite'); 
        const {nome,titulo,produto,subproduto,valor} = req.body

        console.log(req.body)

        sqlite.insert("promocoes",{nome:nome, produto: produto, subproduto:subproduto, titulo:titulo, valor: valor}, function(res){
            if(res.error)
                throw res.error;
            else{   
            console.log('Savo com sucesso');
        } 
        });
        sqlite.close();
        return res.status(200).json({msg: "Teste"})    
    
      },
      Edit: async (req, res) => {
        sqlite.connect('./database/database.sqlite'); 
        const {nome,titulo,produto,subproduto,valor} = req.body
        const{id} = req.params

        sqlite.update("promocoes",{nome:nome, produto: produto, subproduto:subproduto, titulo:titulo, valor: valor},{id: id}, function(res){
            if(res.error)
                throw res.error;
            else{   
            console.log('editado com sucesso');
        } 
        });
        sqlite.close();
        return res.status(200).json({msg: "Teste"})    
    
      },

      Delete: async (req, res) => {
        sqlite.connect('./database/database.sqlite');         
        const{id} = req.params

        sqlite.delete("promocoes",{id: id}, function(res){
            if(res.error)
                throw res.error;
            else{   
            console.log('deletado com sucesso');
        } 
        });
        sqlite.close();
        return res.status(200).json({msg: "Teste"})    
    
      },

      storeVideo: async (req, res) => {
        sqlite.connect('./database/database.sqlite');         
        const{titulo,tempo} = req.body
        const [arquivo] = req.files;
        arquivo2 = `/arquivos/${arquivo.filename}`

        sqlite.insert("arquivos",{titulo:titulo, tempo: tempo, status:'ATIVA', path:arquivo2}, function(res){
            if(res.error)
                throw res.error;
            else{   
            console.log('Salvo com sucesso');
        } 
        });
        sqlite.close();
        return res.status(200).redirect("/adm")    
    
      },
      DeleteVideo: async (req, res) => {
        sqlite.connect('./database/database.sqlite');     
        const {id} = req.params         
      
      

        sqlite.delete("arquivos",{id:id}, function(res){
            if(res.error)
                throw res.error;
            else{   
            console.log('Video deletado com sucesso');
        } 
        });
        sqlite.close();
        return res.status(200).json({msg: "Teste"})  
    
      },
      GetVideo: async (req, res) => {
        sqlite.connect('./database/database.sqlite');         
        const dados2 = sqlite.run("SELECT * FROM arquivos", function(rows2){
            console.log(rows2)
            video = rows2
        })       
        sqlite.close();
        res.status(200).json(video) 
    
      },   


}

module.exports = promocoes