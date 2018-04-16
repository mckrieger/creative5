
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.string('gender');
      table.integer('age');
      table.boolean('snoring');
      table.text('time');
      table.boolean('extra');
      table.integer('clean');
      table.text('hobbies');
      table.text('quiet');
      table.text('expectation');
      table.text('other');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropColumn('gender');
      table.dropColumn('age');
      table.dropColumn('snoring');
      table.dropColumn('time');
      table.dropColumn('extra');
      table.dropColumn('clean');
      table.dropColumn('hobbies');
      table.dropColumn('quiet');
      table.dropColumn('expectation');
      table.dropColumn('other');
    }),
  ]);
};
