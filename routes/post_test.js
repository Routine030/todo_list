//var Sequelize = require('sequelize');
var model = require('./post');
/*model.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
*/
model.findAll({ paranoid: false}).then(function(result){
            console.log('query all users');
            for (var i = 0, output; output = result[i++];) {
                console.log('todo=' + output.content);
            }        
    })

/*var post = Post.sync();

Post.create({content:'todo1',create_at:Date.now()})
.then(function(result){
        console.log('inserted ok');
}).catch(function(err){
        console.log('inserted error');
        console.log(err.message);
});*/
//module.exports = Post;