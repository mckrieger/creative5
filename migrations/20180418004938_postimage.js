
exports.up = function(knex, Promise) {
  return knex.schema.table('posts', function(table) {
    table.string('image').notNull().defaultTo("");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', function(table) {
    table.dropColumn('image');
  });
};
