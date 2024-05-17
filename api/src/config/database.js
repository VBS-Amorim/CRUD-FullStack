//Descrição: arquivo responsável pelas connectionStrings da aplicação no Pqsl

const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

//Conexão com a Base de Dados:
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on('connect', () => {
  console.log('Sucesso!');
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};