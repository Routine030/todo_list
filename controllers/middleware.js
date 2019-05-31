const db = require('../models');

exports.preCheckContent = function (req, res, next) {
  let error;
  if (req.body.createtodo === (null || undefined || '')) {
    error = new Error('Input is null');
    throw error;
  }
  if ((req.body.createtodo).length > 50) {
    error = new RangeError('Input is too long');
    throw error;
  }
  next();
};
exports.idNotANum = function (req, res, next) {
  const reqId = req.params.id;
  const num = /^[0-9] .?[0-9]*/;
  let error;
  if (reqId === 0) {
    error = new RangeError('Index error');
    next(error);
  }
  if (num.test(reqId)) {
    error = new RangeError('Not a number');
    next(error);
  }
  next();
};
exports.idIsUnique = function (req, res, next) {
  const todoId = req.params.id;

  const checkIdExist = async function (id) {
    let ret;
    try {
      ret = await db.todolists.findByPk(id, { paranoid: false });
      console.log(`ret:${ret}`);
    } catch (err) {
      next(err);
    }
    if (!ret) {
      const error = new RangeError('Index error');
      next(error);
    } else {
      next();
    }
  };

  checkIdExist(todoId);
};
