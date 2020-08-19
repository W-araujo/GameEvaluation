exports.up = function (knex) {
    return knex.schema.createTable('evaluator', function (table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable();
        table.date('birthday').notNullable();

        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.boolean('is_deleted').default(false);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('evaluator');
};
