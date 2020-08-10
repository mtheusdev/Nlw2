## PARA O server.ts
//yarn add typescript -D
//yarn tsc --init
//yarn add ts-node-dev -D
import express, { response } from 'express';

const app = express();

app.use(express.json()) // ei app introduza um pacote json no express par ao express entender o json no request

// request nos da informações sobre a requisição. nome de user, senha, etc
// response é a resposta do api, backend
// cada rota tem o endereço da aplicação 
// localhost:3333/users   => '/users' = recurso que estamos acessando
// Metodos http => get (buscar ou listar uma info), 
// post (criar uma nova info no back),
// put (atualizar),
// delete
// navegador sempre faz por get
// usar postman ou imsomnia
// podemos usar o mesmo recurso para metodos diferentes, get, post ..

// corpo da requisição request body: Dados para a crianção ou atualização de um registro
// Route params: Identificar qual recurso eu quero atyualizar ou deletar ex abaixo (id)
// app.delete('/users/:id', (request, response) .... request.params
// Query params: Paginação (listar todos os usuarios da pagina 2, ordenar por nome etc, filtros)
// exempro Query app.get('/users', (request, response) => { console.log(request.query)
// definindo rotas
/**
 * app.post('/users', (request, response) => { 
  console.log(request.body)
  const users = [
    { name: 'Matheus' , age: 22},
    { name: 'Ana' , age: 18 }
  ]
  return response.json(users); // sempre devolver da api para o fron um json
});
 */
// Identificar casos de uso (Funcionalidades)
// 

app.get('/', (request, response) => { 
  return response.json({message : 'Hello World'}); // sempre devolver da api para o fron um json
});


app.listen(3333); // enviando requisição http na porta 3333
// localhost:3333

///////////////////////////

## Funcionalidades

--Rota para lsita o total de conexões realizadas
--Rota para criar uma nova conexão

## Aulas

--Rota para criar uma aula
--Rota para lista aulas
  -Filtrar por matéria, dia da semana e horário

## DB
-- Usaremos sqlite3 e knex
Select * from users
knex('users').select('*')