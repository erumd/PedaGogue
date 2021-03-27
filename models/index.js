const User = require('./User');
const Topic = require('./Topic');
const Comment = require('./Comment');

Topic.hasMany(Comment, {
  foreignKey: 'topic_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Topic, Comment };
