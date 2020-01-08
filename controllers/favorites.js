const models = require("../models");
const categories = models.categories;
const events = models.events;
const users = models.users;
const favorites = models.favorites;
const { newFavorites } = require("../helpers/functions");

exports.favorites = (req, res) => {
  favorites
    .findAll({
      where: {
        user_id: req.user_id
      },
      include: [
        {
          model: events,
          as: "event",
          include: [
            {
              model: categories,
              as: "category"
            },
            {
              model: users,
              as: "user"
            }
          ]
        },
        {
          model: users,
          as: "user"
        }
      ]
    })
    .then(result => {
      res.status(200).json(newFavorites(result));
    });
};

exports.favorite = (req, res) => {
  favorites
    .findAll({
      where: {
        user_id: req.user_id
      }
    })
    .then(data => {
      res.status(200).json(data);
    });
};

exports.addFavorite = (req, res) => {
  favorites
    .findAll({
      where: {
        user_id: req.user_id,
        event_id: req.body.event_id
      }
    })
    .then(favorite => {
      if (favorite.length > 0) {
        res.status(200).json({
          status: false,
          message: `Favorite already exists`
        });
      } else {
        favorites
          .create({
            user_id: req.user_id,
            event_id: req.body.event_id
          })
          .then(result => {
            if (result != null) {
              res.status(200).json({
                status: true,
                message: `Event was favorite's`
              });
            } else {
              res.status(200).json({
                status: false,
                message: `Failed To favorite this event`
              });
            }
          });
      }
    });
};

exports.deleteFavorite = (req, res) => {
  favorites
    .destroy({
      where: {
        user_id: req.user_id,
        event_id: req.body.event_id
      }
    })
    .then(result => {
      if (result === 0) {
        res.status(500).json({
          status: false,
          message: "unFavorite has been failed"
        });
      } else {
        res.status(200).json({
          status: true,
          message: "unFavorite has been success"
        });
      }
    });
};
