var express = require('express');
var router = express.Router();
var db = require('./post');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
function testquery(req,res,next){
	if(req.query.bookdate){
		var parts =req.query.bookdate.split('-');
		res.cookie('year',parts[0]);
		res.cookie('mon',parts[1]);
		res.cookie('day',parts[2]);
	}
	next();
}
router.route('/')
	.post(function(req,res){//create new todo
		db.create({content: req.body.todo_new })
		.then(function(result){
		        console.log('inserted ok');
		        res.redirect( '/' );
		}).catch(function(err){
		        console.log('inserted error');
		        console.log(err.message);
		});		
	})
	.get(testquery,function (req, res){//display all item
		var complete_list =[];
		var complete_date =[];
		var delete_list =[];
		var id_list=[];
		var get_date=0;
		var parts=[];
		if(req.query.bookdate){
			parts =req.query.bookdate.split('-');
			get_date=1;
		}else if(req.cookies.day){
			parts[0]=req.cookies.year;
			parts[1]=req.cookies.mon;
			parts[2]=req.cookies.day;
			get_date=1;
		}
		if(get_date){//only find by create date
			//var parts =req.query.bookdate.split('-');
			var req_date = new Date(parts[0], parts[1] - 1, parts[2]);
			//console.log(req_end_date);
			db.findAll({where: { createdAt: {[Op.gte]: req_date-24 * 60 * 60 * 1000, [Op.lt]: req_date}},paranoid: false}).then(function(result){
		        for (var i = 0, output; output = result[i++];) {
		        	if(output.deletedAt){
		        		delete_list.push(1);
		        	}
		        	else{
						delete_list.push(0);
		        	}
		        	complete_list.push(output.content);
		        	complete_date.push(output.updatedAt);
		        	id_list.push(output.id);
		        }
			/* render page */
				res.render('index', {title : 'Express Todo Example',
				task: complete_list,
				date: complete_date,
				del_task: delete_list,
				id_index: id_list
				}); 
			})
		}else{
			db.findAll({ paranoid: false}).then(function(result){
		        for (var i = 0, output; output = result[i++];) {
		        	if(output.deletedAt){
		        		delete_list.push(1);
		        	}
		        	else{
						delete_list.push(0);
		        	}
		        	complete_list.push(output.content);
		        	complete_date.push(output.updatedAt);
		        	id_list.push(output.id);
		        }
			/* render page */
				res.render('index', {title : 'Express Todo Example',
				task: complete_list,
				date: complete_date,
				del_task: delete_list,
				id_index: id_list
				}); 
			})
		}	
	});
router.get('/todo/del/:id', function (req, res) {//TEMP del=>should use http delete method
		var req_id = req.params.id;
		db.destroy({
		  where: {
		    id: req_id
		  }
		}).then(() => {
		  console.log("Done");
		  res.redirect( '/' );
		});	
	});
router.route('/todo/:id')
	.post(function(req,res){
		var req_id = req.params.id;
		if(typeof(req.body.todo_update) == "undefined"){//recovery
			db.update( { deletedAt: null }, { where: {id: req_id}, paranoid: false  })
			.then(() => {
			  console.log("recovery");
			  res.redirect( '/' );
			});	
		}
		else{//modified
			db.update( { content: req.body.todo_update }, { where: {id: req_id}})
			.then(() => {
			  console.log("update");
			  console.log("has value:"+(req.body.todo_update));
			  res.redirect( '/' );
			});
		}
	})//modified item=>should use http update method
/*	.delete(function(req,res){
	
	})//del item*/
	.get(function(req,res){	//get edit page, TBD=>remove to Backend?
		var req_id = req.params.id;
		var complete_list =[];
		var complete_date =[];
		var delete_list =[];
		var id_list=[];
		db.findAll({ paranoid: false}).then(function(result){
	        for (var i = 0, output; output = result[i++];) {
	        	if(output.deletedAt){
	        		delete_list.push(1);
	        	}
	        	else{
					delete_list.push(0);
	        	}
	        	complete_list.push(output.content);
	        	complete_date.push(output.updatedAt);
	        	id_list.push(output.id);
	        }
	        console.log("edit:"+req_id+"length:"+complete_list.length);
		/* render page */
			res.render('edit', {title : 'Express Todo Example',
			task: complete_list,
			date: complete_date,
			del_task: delete_list,
			edit_id: req_id,
			id_index: id_list
			}); 
		})			
	});
module.exports = router;
