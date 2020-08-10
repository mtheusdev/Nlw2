import knex from 'knex';
import path from 'path'

// migrations => controlam a versão do banco de dados

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true, // somente para o sqlite, utilize null quando nc onseguir definir um campo padrao no db
});

export default db;