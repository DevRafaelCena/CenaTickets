const sqlite = require('sqlite-sync');


let configuracoes = {

    lista: async (req, res) => {
        sqlite.connect('./database/database.sqlite'); 
        
       let lista =''      
        const dados = sqlite.run("SELECT * FROM configuracoes", function(rows){
            console.log(rows)
            lista = rows
        })
        sqlite.close();
        return res.status(200).json(lista) 
    
      },

      storeEntrada: async (req, res) => {
        sqlite.connect('./database/database.sqlite');               
        const{inputEntrada} = req.body       

        sqlite.update("configuracoes",{fraseEntrada:inputEntrada}, function(res){
            if(res.error)
                throw res.error;
            else{   
            console.log('Salvo com sucesso');
        } 
        });
        sqlite.close();
        return res.status(200).json({msg: "Entrada salvo com sucesso"})
    
      },
      
      storeSaida: async (req, res) => {
        sqlite.connect('./database/database.sqlite');               
        const{inputSaida} = req.body       

        sqlite.update("configuracoes",{fraseSaida:inputSaida}, function(res){
            if(res.error)
                throw res.error;
            else{   
            console.log('Salvo com sucesso');
        } 
        });
        sqlite.close();
        return res.status(200).json({msg: "Saida salvo com sucesso"})
    
      },
      storeTempoVideo: async (req, res) => {
        sqlite.connect('./database/database.sqlite');               
        const{inputTempoVideo} = req.body       

        sqlite.update("configuracoes",{tempoRepeticaoVideo:inputTempoVideo}, function(res){
            if(res.error)
                throw res.error;
            else{   
            console.log('Salvo com sucesso');
        } 
        });
        sqlite.close();
        return res.status(200).json({msg: "Saida salvo com sucesso"})
    
      },
      storeTempoPromocoes: async (req, res) => {
        sqlite.connect('./database/database.sqlite');               
        const{inputTempoPromocoes} = req.body       

        sqlite.update("configuracoes",{tempoEntrePromocoes:inputTempoPromocoes}, function(res){
            if(res.error)
                throw res.error;
            else{   
            console.log('Salvo com sucesso');
        } 
        });
        sqlite.close();
        return res.status(200).json({msg: "Tempo salvo com sucesso"})
    
      },
    

}

module.exports = configuracoes