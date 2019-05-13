var Sequelize = require('sequelize');
var model = require('../models/index');

var Post = model.sequelize.define('todos', {
    content: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: false,
    paranoid: true
});
Post.sync();
module.exports = Post;