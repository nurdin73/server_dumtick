const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');
const models = require ('../models');
const users = models.users;

exports.register = (req, res) => {
  let storeName, storeEmail, storePassword, storeUsername, storePhone;
  const {name, email, phone, username, password, role} = req.body;

  storeName = name.trim ();
  storePassword = password.trim ();
  storeEmail = email.trim ();
  storePhone = phone.trim ();
  storeUsername = username.trim ();

  users
    .findAll ({
      where: {
        email: storeEmail,
      },
    })
    .then (email => {
      if (email.length > 0) {
        res.status (200).json ({
          message: 'email has been registered',
        });
      } else {
        users
          .findAll ({
            where: {
              username: storeUsername,
            },
          })
          .then (username => {
            if (username.length > 0) {
              res.status (200).json ({
                message: 'username has been used',
              });
            } else {
              bcrypt.genSalt (10, (err, salt) => {
                if (err) {
                  res.status (400).json ({
                    message: 'bad request',
                  });
                } else {
                  bcrypt.hash (storePassword, salt, (err, hash) => {
                    if (err) {
                      res.status (500).json ({
                        message: 'server response error',
                      });
                    } else {
                      users
                        .create ({
                          name: storeName,
                          email: storeEmail,
                          phone: storePhone,
                          username: storeUsername,
                          password: hash,
                          role: role,
                        })
                        .then (data => {
                          if (data) {
                            const token = jwt.sign ({id: data.id}, 'nurdin');
                            res.status (200).json ({
                              message: 'success',
                              token: token,
                            });
                          } else {
                            res.status (500).json ({
                              message: 'add user failed',
                            });
                          }
                        });
                    }
                  });
                }
              });
            }
          })
          .catch (error => {
            res.status (500).json ({error});
          });
      }
    });
};

exports.login = (req, res) => {
  let storeUsername, storePassword;
  const {username, password} = req.body;
  storeUsername = username.trim ();
  storePassword = password.trim ();
  users
    .findOne ({
      where: {
        username: storeUsername,
      },
    })
    .then (user => {
      if (user) {
        bcrypt.compare (storePassword, user.password, (err, isMatch) => {
          if (err) {
            res.status (400).json ({
              message: 'bad request',
            });
          } else if (!isMatch) {
            res.status (200).json ({
              message: 'password doesnt match',
            });
          } else {
            const token = jwt.sign ({id: user.id}, 'nurdin');
            res.status (200).json ({
              message: 'success',
              username: user.username,
              token: token,
            });
          }
        });
      } else {
        res.status (200).json ({
          message: 'username is not registered',
        });
      }
    });
};

exports.profile = (req, res) => {
  users
    .findOne ({
      where: {
        id: req.params.id,
      },
    })
    .then (data => {
      if (data === null) {
        res.status (200).json ({
          message: 'user not found',
        });
      } else {
        res.status (200).json ({
          id: data.id,
          name: data.name,
          phone: data.phone,
          email: data.email,
          image: data.image,
        });
      }
    });
};
exports.user = (req, res) => {
  users
    .findOne ({
      where: {
        id: req.user_id,
      },
    })
    .then (data => {
      if (data === null) {
        res.status (200).json ({
          message: 'user not found',
        });
      } else {
        res.status (200).json ({
          id: data.id,
          name: data.name,
          initial: data.name[0],
          phone: data.phone,
          email: data.email,
          image: data.image,
        });
      }
    });
};

exports.update = (req, res) => {
  users
    .findOne ({
      where: {
        id: parseInt (req.body.id),
      },
    })
    .then (data => {
      if (data.id != req.user_id) {
        res.status (403).json ({
          message: 'you are not authorized for this action',
        });
      } else {
        const {name, phone, image} = req.body;
        users
          .update (
            {
              name: name,
              phone: phone,
              image: image,
            },
            {
              where: {
                id: req.body.id,
              },
            }
          )
          .then (status => {
            if (status === 0) {
              res.status (500).json ({
                status: 'failed',
                message: 'update failed',
              });
            } else {
              res.status (200).json ({
                status: 'success',
                message: 'update user is success',
              });
            }
          });
      }
    });
};
