const express = require("express");
const fs = require("fs");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

id_dado_global = 1;

let dados = [
    {
        "id": 1,
        "nome" : "Miguel",
        "email" : "miguel@teste.com",
        "username":"miguel123",
        "endereco" : "",
        "cpf" : "123.456.789-10",
        "cep" : "38409-085",
        "bairro" : "Novo Mundo",
        "localidade" : "Av. Victor Alves Pereira",
        "cidade" : "Uberlândia",
        "uf" : "MG",
        "complemento" : "",
        "descrição":"",
        "preço":"preço",
        "dataNascimento" : "10/10/1980",
        "idade": 45,
        "tipo": "cliente" // Adicionei um tipo para o exemplo
    }
];

const salvarDadosEmArquivo = (dados) => {
    // Caminho do arquivo onde os dados serão salvos
    const caminhoArquivo = 'dados.txt';

    // Converter os dados para uma string no formato JSON com quebra de linha entre cada entrada
    const dadosFormatados = dados.map(dado => JSON.stringify(dado) + '\n').join('');

    // Adicionar os dados ao arquivo
    fs.appendFile(caminhoArquivo, dadosFormatados, (err) => {
        if (err) {
            console.error('Erro ao salvar os dados:', err);
            return;
        }
        console.log('Dados salvos com sucesso!');
    });
};

app.get("/", (req, res) => {
    res.send("Maravilha!");
});

app.get("/about", (req, res) => {
    res.send("Dentro do ABOUT!!");
});

app.get("/dados", (req, res) => { //req.query.id
    dado =  req.query.nome;
    dado_retorno = {}
    for (let i = 0; i < dados.length; i++) {
        if (dado == dados[i].nome){
            console.log("Achei!!");
            dado_retorno = dados[i]
            break;
        }        
    }      
    res.json(dado_retorno);
});

app.get("/alldados", (req, res) => {
// esse filtro não funciona
    const { tipo } = req.query;
    if (tipo === 'produto') {
        const produtosCadastrados = dados.filter(item => item.tipo === 'produto');
        res.json(produtosCadastrados);
    } else if (tipo === 'cliente') {
        const clientesCadastrados = dados.filter(item => item.tipo === 'cliente');
        res.json(clientesCadastrados);
    } else {
        // Se nenhum tipo específico for solicitado, retorna todos os dados
        res.json(dados);
    }
});

app.post("/dados", (req, res) => {
    dado = req.body;
    console.log("#### POST ####");
    console.log(dado);
    console.log("#### dado ####");
    id_dado_global++;
    dado.id = id_dado_global;
    console.log("#### ADD dado ####");
    console.log(dado);
    console.log("#### DEPOIS dado ####");
    dados.push(dado); 

    // Salvar os dados em um arquivo de texto após inserção
    salvarDadosEmArquivo(dados);

    res.json(dados);
});

app.put("/dados", (req, res) => {
    dado = req.body;
    dado_retorno = {}
    for (let i = 0; i < dados.length; i++) {
        if (dado.nome == dados[i].nome){
            console.log("Achei!!");
            res.json(dados);
            dado_retorno = dado[i]
            break;
        }        
    }
    res.json(dado_retorno);  
});

app.listen(5000, ()=> console.log("SERVER IS RUNNING!!!"));
