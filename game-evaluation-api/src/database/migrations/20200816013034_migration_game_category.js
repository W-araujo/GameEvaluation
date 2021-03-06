
exports.up = function(knex) {
    return knex.schema.createTable('game_category', function (table) {
        table.increments('id').primary();
        table.integer('game_id').unsigned().notNullable();
        table.integer('category_id').unsigned().notNullable();

        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.boolean('is_deleted').default(false);

        table.foreign('game_id').references('id').inTable('game');
        table.foreign('category_id').references('id').inTable('category');
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('game_category');
};
