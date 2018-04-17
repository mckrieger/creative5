
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', function(table) {
      table.increments('id').primary();
      table.text('description');
      table.string('price');
      table.boolean('extra');
      table.string('city');
      table.integer('zipCode');
      table.string('gender');
      table.dateTime('created');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('posts'),
  ]);
};
