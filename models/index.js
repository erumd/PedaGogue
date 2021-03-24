const User = require('./User');
const Topic = require('./Topic');
const Comment = require('./Comment');

Topic.hasMany(Comment, {
  foreignKey: 'topic_id',
  onDelete: 'CASCADE',
});

// Comment.belongsTo(User, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

// Comment.belongsTo(Topic, {
//   foreignKey: 'topic_id',
//   onDelete: 'CASCADE',
// });

module.exports = { User, Topic, Comment };
