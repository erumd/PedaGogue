const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, {});

Post.belongsTo(User);

module.exports = { User, Post };
