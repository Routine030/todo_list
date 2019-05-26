var express = require('express');
var router = express.Router();
var db  = require('../models');

function idNotANum(req,res,next)
{
	var req_id = req.params.id;
	var num = /^[0-9] .?[0-9]*/;
	if(req_id==0){
		var error = new RangeError('Index error');
		next(error);
	}
	if(num.test(req_id)){
		var error = new RangeError('Not a number');
		next(error);			
	}
	next(); 
}
function idIsUnique(req,res,next)
{
	var todo_id = req.params.id;

	let checkIdExist = function(id){ //use promise to get query result
		return db.todolists.findByPk(id,{ paranoid: false}) // paranoid: false=>the data has deletedAt will be search
		.then(function(ret){
			if(!ret){
				return 0;
			}
			return ret.dataValues;
		})
		.catch(function(err){
			next(err);
		});	
	}
	checkIdExist(todo_id)
	.then(function(ret){
		if(ret==0){
			var error = new RangeError('Index error');
			next(error);
		}
		else{
			next();
		}
	})
	.catch(function(err){
		next(err);
	});			
}
function preCheckContent(req,res,next)
{
	if(req.body.createtodo==(null|| undefined || "")){
		var error = new Error('Input is null');
		throw error;
	}
	if((req.body.createtodo).length>50){
		var error = new RangeError('Input is too long');
		throw error;
	}	
	next(); 
}
router.route('/')
	.post(preCheckContent,function(req,res){//create new todo	
		db.todolists.create({content: req.body.createtodo})
		.then(function(result){
				let jsonstr=JSON.stringify(result.dataValues);
				let arr=JSON.parse(jsonstr);
				let resstr=[];
				resstr.push({
			            id: arr.id,
			            createdAt: arr.createdAt,
			            content:  arr.content,
			    });
			    console.log(resstr);
		        res.status(200).json(resstr);
		}).catch(function(err){
				res.json(err.message);
		});		
	})
	.get(function (req, res){//display all item
		db.todolists.findAll({ paranoid: false}).then(function(result){
			var arr = [];
	        for (var i = 0, output; output = result[i++];) {
	        	let del_tag=0;
				if(output.deletedAt){
					del_tag=1;
				}
				arr.push({
			            id: output.id,
			            createdAt: output.createdAt,
			            content:  output.content,
			            deltag: del_tag
			    });
	        }
		/* render page */
		res.json(arr);
		}).catch(function(err){
			res.json(err.message);
		});		
	});
router.route('/todo/:id')
	.delete(idNotANum,idIsUnique,function(req,res){
		var req_id = req.params.id;
		db.todolists.destroy({
		  where: {
		    id: req_id
		  }
		}).then(() => {
		  console.log("delete");
		  res.status(200).json('ok');
		}).catch(function(err){
		     res.json(err.message);
		});		
	})
	.post(idNotANum,idIsUnique,function(req,res){
		var req_id = req.params.id;
		db.todolists.update( { deletedAt: null }, { where: {id: req_id}, paranoid: false })
		.then(() => {
		  console.log("recovery");
		  res.status(200).json('ok');
		}).catch(function(err){
		    res.json(err.message);
		});
	})
	.put(idNotANum,idIsUnique,function(req,res){
		var req_id = req.params.id;
		console.log(req.body.oriMsg);
		db.todolists.update( { content: req.body.oriMsg }, { where: {id: req_id}})
		.then(() => {
		  console.log("update");
		  res.status(200).json('ok');
		}).catch(function(err){
		    res.json(err.message);
		});
		
	});

module.exports = router;
