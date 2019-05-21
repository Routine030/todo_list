var Sequelize = require('sequelize');
var model = require('../models/index');

var Post = model.sequelize.define('todolists', {
    content: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: false,
    paranoid: true,
    charset: 'utf8mb4',
  	collate: 'utf8mb4_unicode_ci'
});
Post.sync();
module.exports = Post;