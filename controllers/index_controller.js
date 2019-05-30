const { Op } = require('sequelize');
const db = require('../models');

exports.createItem = function (req, res) {
  db.todolists.create({ content: req.body.createtodo })
    .then((result) => {
      const jsonstr = JSON.stringify(result.dataValues);
      const arr = JSON.parse(jsonstr);
      const resstr = [];
      resstr.push({
        id: arr.id,
        createdAt: arr.createdAt,
        content: arr.content,
      });
      res.status(200).json(resstr);
    }).catch((err) => {
      res.json(err.message);
    });
};
exports.showAll = function (req, res) {
  db.todolists.findAll({ paranoid: false }).then((result) => {
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
    /* render page */
    res.json(arr);
  }).catch((err) => {
    res.json(err.message);
  });
};
exports.deleteItem = function (req, res) {
  const reqId = req.params.id;
  db.todolists.destroy({
    where: {
      id: reqId,
    },
  }).then(() => {
    res.status(200).json('ok');
  }).catch((err) => {
    res.json(err.message);
  });
};
exports.revItem = function (req, res) {
  const reqId = req.params.id;
  db.todolists.update({ deletedAt: null }, { where: { id: reqId }, paranoid: false })
    .then(() => {
      res.status(200).json('ok');
    }).catch((err) => {
      res.json(err.message);
    });
};
exports.updateItem = function (req, res) {
  const reqId = req.params.id;
  db.todolists.update({ content: req.body.oriMsg }, { where: { id: reqId } })
    .then(() => {
      res.status(200).json('ok');
    }).catch((err) => {
      res.json(err.message);
    });
};
exports.queryItem = function (req, res) {
  if (req.query.date) {
    const qdate = new Date(req.query.date);
    db.todolists.findAll({
      where: {
        createdAt: {
          [Op.lt]: new Date(qdate.getTime() + 24 * 60 * 60 * 1000),
          [Op.gt]: qdate,
        },
      },
      paranoid: false,
    })
      .then((result) => {
        const arr = [];
        let i; let output;
        for (i = 0, output; i < result.length;) {
          output = result[i];
          i += 1;
          arr.push(output.id);
        }
        /* render page */
        res.status(200).json(arr);
      }).catch((err) => {
        res.json(err.message);
      });
  } else if (req.query.text) {
    const qtext = req.query.text;
    db.todolists.findAll({
      where: {
        content: { [Op.substring]: qtext },
      },
      paranoid: false,
    }).then((result) => {
      const arr = [];
      let i; let output;
      for (i = 0, output; i < result.length;) {
        output = result[i];
        i += 1;
        arr.push(output.id);
      }
      /* render page */
      res.status(200).json(arr);
    }).catch((err) => {
      res.json(err.message);
    });
  } else {
    res.json('');
  }
};
