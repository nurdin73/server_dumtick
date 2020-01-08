const models = require("../models");
const categories = models.categories;
const events = models.events;
const users = models.users;
const payments = models.payments;
const {
  newPayments,
  formatDate,
  formatRupiah
} = require("../helpers/functions");

exports.post = (req, res) => {
  console.log(req.body.event_id);
  events
    .findOne({
      where: {
        id: req.body.event_id
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
    .then(event => {
      if (event === null) {
        res.status(200).json({
          success: false,
          message: "event not found"
        });
      } else {
        const { quantity, event_id } = req.body;
        console.log(event_id);
        payments
          .create({
            quantity: quantity,
            totalPrice: quantity * event.price,
            status: "pending",
            attachment:
              "http://khanfarkhan.com/wp-content/uploads/2018/03/terbaru13-Contoh-Bentuk-Kwitansi-Pembayaran-2.png",
            event_id: event_id,
            buyer_id: req.user_id
          })
          .then(data => {
            if (data === 0) {
              res.status(500).json({
                message: "add payment failed",
                success: false
              });
            } else {
              res.status(200).json({
                success: true,
                id: data.id,
                event: {
                  id: event.id,
                  title: event.title,
                  category: {
                    id: event.category.id,
                    name: event.category.name
                  },
                  startTime: formatDate(event.startTime),
                  endTime: formatDate(event.endTime),
                  price: formatRupiah(event.price),
                  description: event.description,
                  address: event.address,
                  urlMaps: event.urlMap,
                  img: event.image,
                  createdBy: {
                    id: event.user.id,
                    name: event.user.name,
                    phoneNumber: event.user.phone,
                    email: event.user.email,
                    img: event.user.image
                  }
                },
                quantity: data.quantity,
                totalPrice: data.totalPrice,
                attachment: data.attachment,
                status: data.status
              });
            }
          });
      }
    });
};

exports.confirm = (req, res) => {
  payments
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(payment => {
      if (payment === null) {
        res.status(200).json({
          message: "payment not found"
        });
      } else {
        if (payment.buyer_id != req.user_id) {
          res.status(403).json({
            message: "you not autorized in this order"
          });
        } else {
          payments
            .update(
              {
                status: req.body.status
              },
              {
                where: {
                  id: req.params.id
                }
              }
            )
            .then(data => {
              if (data === 0) {
                res.status(500).json({
                  message: "update error",
                  status: "failed"
                });
              } else {
                events
                  .findOne({
                    where: {
                      id: payment.event_id
                    },
                    include: [
                      {
                        model: users,
                        as: "user"
                      },
                      {
                        model: categories,
                        as: "category"
                      }
                    ]
                  })
                  .then(event => {
                    res.status(200).json({
                      status: "success",
                      id: payment.id,
                      event: {
                        id: event.id,
                        title: event.title,
                        category: {
                          id: event.category.id,
                          name: event.category.name
                        },
                        startTime: formatDate(event.startTime),
                        endTime: formatDate(event.endTime),
                        price: formatRupiah(event.price),
                        description: event.description,
                        address: event.address,
                        urlMaps: event.urlMap,
                        img: event.image,
                        createdBy: {
                          id: event.user.id,
                          name: event.user.name,
                          phoneNumber: event.user.phone,
                          email: event.user.email,
                          img: event.user.image
                        }
                      },
                      quantity: payment.quantity,
                      totalPrice: formatRupiah(payment.totalPrice),
                      attachment: payment.attachment,
                      status: req.body.status
                    });
                  });
              }
            });
        }
      }
    });
};

exports.approved = (req, res) => {
  payments
    .findAll({
      where: {
        status: req.query.status,
        buyer_id: req.user_id
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
          as: "buyer"
        }
      ]
    })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(newPayments(data));
      } else {
        res.status(200).json({
          message: "Your ticket is not found",
          result: false
        });
      }
    });
};

exports.pending = (req, res) => {
  payments
    .findAll({
      where: {
        buyer_id: req.user_id,
        status: "pending"
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
          as: "buyer"
        }
      ]
    })
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(newPayments(data));
      } else {
        res.status(200).json({
          message: "data payment is not found",
          result: false
        });
      }
    });
};
