import Knex from 'knex'

export async function up(knex: Knex) {
  /// criar tabela
  return knex.schema.createTable('class_schedule', table => {
    table.increments('id').primary();
    table.integer('week_day').notNullable(); // 0 domingo 6 sabado
    table.integer('from').notNullable(); // hora q começa
    table.integer('to').notNullable(); // hroa q termina

    table.integer('class_id').notNullable().
    references('id').
    inTable('classes').
    onUpdate('CASCADE').
    onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('class_schedule');
  // deletar tabela
}