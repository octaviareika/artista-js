const express = require('express');
const app = express();
const { engine }= require('express-handlebars');
const Handlebars = require('handlebars');
const parte2 = require('./parte2/aprendendo2');
const path = require('path'); 
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');


// Config 
    //Sessão
    app.use(session({
        secret: "cadastroArtistas",
        resave: true,
        saveUninitialized: true
    }));
    app.use(flash());

    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg'); // mensagem de sucesso
        res.locals.error_msg = req.flash('error_msg'); // mensagem de erro
        next();
    })
app.engine('handlebars', engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// MiddleWare
// app.use((req, res, next) => {
//     //console.log("middleware");
//     next();
// })

// Rota

app.get('/artistas', (req, res) => {
    parte2.find().then((artistas) => {
        res.render('artistas', {artistas: artistas})
    }).catch((err) => {
        console.log('Erro ao buscar artistas: ' + err);
    })
});

app.get('/form', (req, res) => {
    res.render('formulario');
})

app.post('/add', (req, res) => {
   // 

    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: 'Nome inválido'});
    }

    if (!req.body.idade || typeof req.body.idade == undefined || req.body.idade == null){
        erros.push({ texto: 'Idade inválida' });
    }

    if (!req.body.anoDeCarreira || typeof req.body.anoDeCarreira == undefined || req.body.anoDeCarreira == null){
        erros.push({ texto: 'Ano de carreira inválido' });
    }

    if (req.body.idade.length < 1) {
        erros.push({ texto: 'Idade muito pequena' });
    }

    if(erros.length > 0) {
        res.render('formulario', {erros: erros});
    }

    else {

        parte2.create({
            nome: req.body.nome,
            idade: req.body.idade,
            anoDeCarreira: req.body.anoDeCarreira
        }).then(() => {
            req.flash('success_msg', 'Artista criado com sucesso');
            res.redirect('/artistas');
        }).catch((err) => {
            console.log('Erro ao criar artista: ' + err);
            req.flash('error_msg', 'Erro ao criar artista');
            res.redirect('/artistas');
        })
    }

    
})


app.listen(8082, (erro) => {
    if(erro) {
        console.log('Erro ao iniciar o servidor: ' + erro);
    } else {
        console.log('Servidor iniciado com sucesso');
    }
});
