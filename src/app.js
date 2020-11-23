const express = require ("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//String de conexão
mongoose.connect("mongodb+srv://***:***@cluster0.4g3c5.mongodb.net/Livraria?retryWrites=true&w=majority", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

//Conexão com o mongo
let db = mongoose.connection;

// Captura de erro ou sucesso na conexão
db.on("error", console.log.bind(console, "iiiiii, deu ruim:"))
db.once("open", function (){
  console.log("Deu Certo!! Massa!!!!!")
})

const index = require ("./routes/index")
const funcionarios = require ('./routes/funcionariosRouter');
const livros = require ("./routes/livrosRouter");


app.use(bodyParser.json());
//app.use(express.json()); Pode usar a do proprio express

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  });

app.use (express.static('public'));

app.use ('/',index);
app.use ('/funcionarios', funcionarios)
app.use('/livros',livros)



module.exports= app