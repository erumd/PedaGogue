const A = require('./A');
const B = require('./B');

A.hasMany(B, {
  onDelete: 'cascade',
});

B.belongsTo(A);

module.exports = { A, B };
