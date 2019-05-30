var db  = require('../models');
exports.preCheckContent = function(req, res,next){
	if(req.body.createtodo==(null|| undefined || "")){
		var error = new Error('Input is null');
		throw error;
	}
	if((req.body.createtodo).length>50){
		var error = new RangeError('Input is too long');
		throw error;
	}		
next(); 
};
exports.idNotANum = function(req, res,next){
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
};
exports.idIsUnique = function(req, res,next){
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
};