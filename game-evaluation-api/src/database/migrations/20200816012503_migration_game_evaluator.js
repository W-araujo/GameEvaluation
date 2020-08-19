exports.up = function (knex) {
    return knex.schema.createTable('game_evaluator', function (table) {
        table.increments('id').primary();
        table.integer('game_id').unsigned();
        table.integer('evaluator_id').unsigned();

        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.boolean('is_deleted').default(false);

        table.foreign('game_id').references('id').inTable('game');
        table.foreign('evaluator_id').references('id').inTable('evaluator');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('game_evaluator');
};
