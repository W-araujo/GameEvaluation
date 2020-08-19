exports.up = function (knex) {
    return knex.schema.createTable('game', function (table) {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.string('description', 255).notNullable();
        table.date('year').notNullable();
        table.string('creator', 255).notNullable();

        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.boolean('is_deleted').default(false);
    })
};

exports.down = function (knex) {
return knex.schema.dropTable('game');
};
