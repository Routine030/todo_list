const { Op } = require('sequelize');
const db = require('../models');

exports.createItem = async function (req, res) {
  let result;
  try {
    result = await db.todolists.create({ content: req.body.createtodo });
  } catch (err) {
    res.json(err.message);
  }
  const jsonstr = JSON.stringify(result.dataValues);
  const arr = JSON.parse(jsonstr);
  const resstr = [];
  resstr.push({
    id: arr.id,
    createdAt: arr.createdAt,
    content: arr.content,
  });
  res.status(200).json(resstr);
};
exports.showAll = async function (req, res) {
  let result;
  try {
    result = await db.todolists.findAll({ paranoid: false });
  } catch (err) {
    res.json(err.message);
  }
  const arr = [];
  let i = 0; let output;
  for (i, output; i < result.length;) {
    output = result[i];
    i += 1;
    let delTag = 0;
    if (output.deletedAt) {
      delTag = 1;
    }
    arr.push({
      id: output.id,
      createdAt: output.createdAt,
      content: output.content,
      deltag: delTag,
    });
  }
  res.json(arr);
};
exports.deleteItem = async function (req, res) {
  const reqId = req.params.id;
  try {
    await db.todolists.destroy({ where: { id: reqId } });
  } catch (err) {
    res.json(err.message);
  }
  res.status(200).json('ok');
};
exports.revItem = async function (req, res) {
  const reqId = req.params.id;
  try {
    await db.todolists.update({ deletedAt: null }, { where: { id: reqId }, paranoid: false });
  } catch (err) {
    res.json(err.message);
  }
  res.status(200).json('ok');
};
exports.updateItem = async function (req, res) {
  const reqId = req.params.id;
  try {
    await db.todolists.update({ content: req.body.oriMsg }, { where: { id: reqId } });
  } catch (err) {
    res.json(err.message);
  }
  res.status(200).json('ok');
};
exports.queryItem = async function (req, res) {
  let result;
  if (req.query.date) {
    const qdate = new Date(req.query.date);
    try {
      result = await db.todolists.findAll({
        where: {
          createdAt: {
            [Op.lt]: new Date(qdate.getTime() + 24 * 60 * 60 * 1000),
            [Op.gt]: qdate,
          },
        },
        paranoid: false,
      });
    } catch (err) {
      res.json(err.message);
    }
    const arr = [];
    let i; let output;
    for (i = 0, output; i < result.length;) {
      output = result[i];
      i += 1;
      arr.push(output.id);
    }
    res.status(200).json(arr);
  } else if (req.query.text) {
    const qtext = req.query.text;
    try {
      result = await db.todolists.findAll({
        where: {
          content: { [Op.substring]: qtext },
        },
        paranoid: false,
      });
    } catch (err) {
      res.json(err.message);
    }
    const arr = [];
    let i; let output;
    for (i = 0, output; i < result.length;) {
      output = result[i];
      i += 1;
      arr.push(output.id);
    }
    res.status(200).json(arr);
  } else {
    res.json('');
  }
};
