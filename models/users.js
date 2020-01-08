"use strict";
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {}
  );
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.payments, {
      foreignKey: "buyer_id",
      as: "buyer"
    });
    users.hasMany(models.events, {
      foreignKey: "createdBy",
      as: "user"
    });
    users.belongsToMany(models.events, {
      through: models.favorites,
      as: "events",
      foreignKey: "user_id"
    });
  };
  return users;
};
