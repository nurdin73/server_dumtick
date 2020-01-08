const models = require("../models");
const categories = models.categories;
const events = models.events;
const users = models.users;
const { Events } = require("../helpers/functions");

exports.index = (req, res) => {
  categories.findAll({}).then(data => {
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(200).json({
        message: "categories not found!"
      });
    }
  });
};
exports.category = (req, res) => {
  events
    .findAll({
      include: [
        {
          model: categories,
          as: "category",
          where: {
            id: req.params.id
          }
        },
        {
          model: users,
          as: "user"
        }
      ]
    })
    .then(data => {
      if (data === null) {
        res.status(200).json({
          message: "category not found"
        });
      } else {
        if (data.length === null) {
          res.status(200).json({
            message: "no event in this category"
          });
        } else {
          res.status(200).json(Events(data));
        }
      }
    });
};

exports.post = (req, res) => {
  const { name, image } = req.body;
  categories
    .create({
      name: name,
      img: image
    })
    .then(data => {
      res.status(200).json(data);
    });
};

exports.patch = (req, res) => {
  const { name, image } = req.body;
  categories
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(category => {
      if (category === null) {
        res.status(200).json({
          message: "category not found"
        });
      } else {
        categories
          .update(
            {
              name: name,
              img: image
            },
            {
              where: {
                id: req.params.id
              }
            }
          )
          .then(data => {
            if (data === 0) {
              res.send(200).json({
                success: false,
                message: "update failed"
              });
            } else {
              res.status(200).json({
                success: true,
                message: "update success"
              });
            }
          });
      }
    });
};

exports.delete = (req, res) => {
  categories
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(category => {
      if (category === null) {
        res.status(200).json({
          message: "category not found"
        });
      } else {
        categories
          .destroy({
            where: {
              id: req.params.id
            }
          })
          .then(data => {
            if (data === 0) {
              res.send(200).json({
                success: false,
                message: "delete failed"
              });
            } else {
              res.status(200).json({
                success: true,
                message: "delete success"
              });
            }
          });
      }
    });
};
