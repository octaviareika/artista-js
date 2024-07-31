const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://root:root@localhost:27017/', { // vai conectar com o banco de dados chamado aprendendo, se não existir ele cria
    
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



const ArtistasSchema = new Schema({ // Schema é a estrutura do banco de dados, criar um modelo de dados
    nome: {
        type: String,
        require: true
    },

    idade: {
        type: Number,
        require: true
    },

    anoDeCarreira: {
        type: Number,
        require: true
    }




});

const Artistas = moongose.model('artistas', ArtistasSchema); // cria a coleção artistas no banco de dados

// const novosArtistas = [

//     {
//         nome: 'Victoria',
//         idade: 21,
//         anoDeCarreira: 3
//     },

//     {
//         nome: 'Joana',
//         idade: 30,
//         anoDeCarreira: 8
//     },

//     {
//         nome: 'Paula',
//         idade: 50,
//         anoDeCarreira: 9
//     }
// ]

// Artistas.insertMany(novosArtistas).then(() => {
//     console.log('Artistas criados com sucesso');
// }).catch((err) => {
//     console.log('Erro ao criar artistas: ' + err);
// });

// atualizar um artista
Artistas.updateOne({nome: 'Victoria'}, {idade: 22}).then(() => {
    console.log('Artista atualizado com sucesso');
}).catch((err) => {
    console.log('Erro ao atualizar artista: ' + err);
});

// deletar um artista

// Artistas.deleteOne({nome: 'Joana'}).then(() => {
//     console.log('Artista deletado com sucesso');
// }).catch((err) => {
//     console.log('Erro ao deletar artista: ' + err);
// });

// buscar um artista

// Artistas.find({nome: 'Paula'}).then((artistas) => {
//     console.log(artistas);
// }).catch((err) => {
//     console.log('Erro ao buscar artista: ' + err);
// });

module.exports =  Artistas; // exporta o modelo de dados para ser usado em outros arquivos