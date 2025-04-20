'use strict';

exports.up = function(db, callback) {
  db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    created_at: {
      type: 'datetime',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: 'datetime',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    },
    name: { type: 'string',notNull: true, length: 100 },
    email: { type: 'string', notNull: true, length: 100 },
    password: { type: 'string', notNull: true, length: 255 }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('users', callback);
};
