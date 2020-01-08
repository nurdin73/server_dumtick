"use strict";
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define(
    "events",
    {
      title: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      address: DataTypes.STRING,
      urlMap: DataTypes.TEXT,
      image: DataTypes.STRING,
      createdBy: DataTypes.INTEGER
    },
    {}
  );
  events.associate = function(models) {
    // associations can be defined here
    events.belongsTo(models.categories, {
      foreignKey: "category_id",
      as: "category",
      sourceKey: "id"
    });
    events.belongsTo(models.users, {
      foreignKey: "createdBy",
      as: "user",
      sourceKey: "id"
    });
    events.hasMany(models.payments, {
      foreignKey: "event_id",
      as: "event"
    });
    events.belongsToMany(models.users, {
      through: models.favorites,
      as: "users",
      foreignKey: "event_id"
    });
  };
  return events;
};
