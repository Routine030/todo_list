var db  = require('../models');
const { Op } = require('sequelize');
exports.createItem = function(req, res){
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
};
exports.showAll = function(req, res){
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
};
exports.deleteItem = function(req, res){
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
};
exports.revItem = function(req, res){
	var req_id = req.params.id;
	db.todolists.update( { deletedAt: null }, { where: {id: req_id}, paranoid: false })
	.then(() => {
	  console.log("recovery");
	  res.status(200).json('ok');
	}).catch(function(err){
	    res.json(err.message);
	});
};
exports.updateItem = function(req, res){
	var req_id = req.params.id;
	console.log(req.body.oriMsg);
	db.todolists.update( { content: req.body.oriMsg }, { where: {id: req_id}})
	.then(() => {
	  console.log("update");
	  res.status(200).json('ok');
	}).catch(function(err){
	    res.json(err.message);
	});
}
exports.queryItem = function(req, res){
	if(req.query.date){
		var qdate = new Date(req.query.date);
		db.todolists.findAll(
			{
				where: {
		  				createdAt: {
		    				[Op.lt]: new Date(qdate.getTime() + 24 * 60 * 60 * 1000),
		    				[Op.gt]: qdate
		 				 }
				}, paranoid: false
			}
		).then(function(result){
			var arr = [];
	        for (var i = 0, output; output = result[i++];) {
	        	let del_tag=0;
				if(output.deletedAt){
					del_tag=1;
				}
				arr.push(output.id);
	        }
		/* render page */
		res.status(200).json(arr);
		}).catch(function(err){
			res.json(err.message);
		});
	}
	else if(req.query.text){
		var qtext = req.query.text;
		console.log(qtext);
		db.todolists.findAll(
			{
				where: {
		  				content:{[Op.substring]: qtext}
				}, paranoid: false
			}
		).then(function(result){
			var arr = [];
	        for (var i = 0, output; output = result[i++];) {
	        	let del_tag=0;
				if(output.deletedAt){
					del_tag=1;
				}
			    arr.push(output.id);
	        }
		/* render page */
		res.status(200).json(arr);
		}).catch(function(err){
			res.json(err.message);
		});
	}
}