const models = require("../models");
const categories = models.categories;
const events = models.events;
const users = models.users;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
  Events,
  formatDate,
  formatRupiah,
  formatDateEvent,
  formatTime
} = require("../helpers/functions");

const date = new Date();
date.setDate(date.getDate() + 10);
date.setMonth(date.getMonth());
let bln = date.getMonth() + 1;
if (bln < 10) {
  bln = "0" + bln;
} else {
  bln = bln;
}
let hari = date.getDate();
if (hari < 10) {
  hari = "0" + hari;
} else {
  hari = hari;
}

let tgl = date.getFullYear() + "-" + bln + "-" + hari;
let ongoing = date.getFullYear() + "-" + bln + "-" + hari;

exports.index = (req, res) => {
  events
    .findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${req.query.title}%`
            }
          },
          {
            startTime: {
              [Op.between]: [req.query.start_time, req.query.end_time]
            }
          },
          {
            endTime: {
              [Op.between]: [req.query.start_time, req.query.end_time]
            }
          }
        ]
      },
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
    })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(Events(data));
      } else {
        res.status(200).json({
          success: false,
          message: "event not founds"
        });
      }
    });
};

// local = local.replace("/", "-");

exports.onGoing = (req, res) => {
  events
    .findAll({
      where: {
        [Op.or]: [
          {
            startTime: {
              [Op.between]: [req.query.startTime, tgl]
            }
          }
        ]
      },
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
    })
    .then(data => {
      console.log(req.query.startTime);
      console.log(tgl);
      if (data.length > 0) {
        res.status(200).json(Events(data));
      } else {
        res.status(200).json({
          success: false,
          message: "event not founds"
        });
      }
    });
};

exports.startDate = (req, res) => {
  events
    .findAll({
      where: {
        startTime: req.query.start_time
      },
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
    })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(Events(data));
      } else {
        res.status(200).json({
          message: "event not founds"
        });
      }
    });
};

exports.all = (req, res) => {
  events
    .findAll({
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
    })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(Events(data));
      } else {
        res.status(200).json({
          message: "event not founds"
        });
      }
    });
};

exports.detail = (req, res) => {
  events
    .findOne({
      where: {
        id: req.params.id
      },
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
    })
    .then(data => {
      if (data === null) {
        res.status(200).json({
          message: "event not found",
          success: false
        });
      } else {
        res.status(200).json({
          id: data.id,
          title: data.title,
          category_name: data.category.name,
          category: {
            id: data.category.id,
            name: data.category.name
          },
          startTime: formatDateEvent(data.startTime),
          timeStart: formatTime(data.startTime),
          timeEnd: formatTime(data.endTime),
          endTime: formatDateEvent(data.endTime),
          price: formatRupiah(data.price),
          priceNumber: data.price,
          description: data.description,
          address: data.address,
          urlMaps: data.urlMap,
          img: data.image,
          createdBy: {
            id: data.user.id,
            name: data.user.name,
            phoneNumber: data.user.phone,
            email: data.user.email,
            img: data.user.image
          }
        });
      }
    });
};

exports.post = (req, res) => {
  let storeTitle;
  const {
    title,
    category_id,
    startTime,
    endTime,
    price,
    description,
    address,
    urlMap,
    image
  } = req.body;
  storeTitle = title.trim();
  events
    .findAll({
      where: {
        title: storeTitle
      }
    })
    .then(eventsData => {
      if (eventsData.length > 0) {
        res.status(200).json({
          message: "title has been used",
          status: "failed"
        });
      } else {
        events
          .create({
            title: storeTitle,
            category_id: category_id,
            startTime: startTime,
            endTime: endTime,
            price: price,
            description: description,
            address: address,
            urlMap: urlMap,
            image: image,
            createdBy: req.user_id
          })
          .then(data => {
            categories
              .findOne({
                where: {
                  id: data.category_id
                }
              })
              .then(category => {
                users
                  .findOne({
                    where: {
                      id: data.createdBy
                    }
                  })
                  .then(user => {
                    res.status(200).json({
                      status: "success",
                      id: data.id,
                      title: data.title,
                      category: {
                        id: category.id,
                        name: category.name
                      },
                      startTime: formatDate(data.startTime),
                      endTime: formatDate(data.endTime),
                      price: formatRupiah(data.price),
                      description: data.description,
                      address: data.address,
                      urlMaps: data.urlMap,
                      img: data.image,
                      createdBy: {
                        id: user.id,
                        name: user.name,
                        phoneNumber: user.phone,
                        email: user.email,
                        img: user.image
                      }
                    });
                  });
              });
          });
      }
    });
};

exports.patch = (req, res) => {
  events
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(event => {
      if (event != null) {
        if (event.createdBy != req.user_id) {
          res.status(403).json({
            message: "you are not authorized to update this event"
          });
        } else {
          events
            .update(req.body, {
              where: {
                id: req.params.id
              }
            })
            .then(data => {
              if (data === 0) {
                res.status(500).json({
                  message: "failed to update this event"
                });
              } else {
                res.status(200).json({
                  message: "success update this event"
                });
              }
            });
        }
      } else {
        res.status(200).json({
          message: "event is not found"
        });
      }
    });
};

exports.delete = (req, res) => {
  events
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(event => {
      if (event === null) {
        res.status(200).json({
          message: "event is not found"
        });
      } else {
        if (event.createdBy != req.user_id) {
          res.status(403).json({
            message: "you are not authorized to delete this event"
          });
        } else {
          events
            .destroy({
              where: {
                id: req.params.id
              }
            })
            .then(data => {
              if (data === 0) {
                res.status(500).json({
                  success: false,
                  message: "Failed to delete this event"
                });
              } else {
                res.status(200).json({
                  success: true,
                  message: "success delete this event"
                });
              }
            });
        }
      }
    });
};
