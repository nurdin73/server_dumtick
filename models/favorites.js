"use strict";
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define(
    "favorites",
    {
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER
    },
    {}
  );
  favorites.associate = function(models) {
    // associations can be defined here
    favorites.belongsTo(models.users, {
      foreignKey: "user_id",
      sourceKey: "id",
      as: "user"
    });
    favorites.belongsTo(models.events, {
      foreignKey: "event_id",
      sourceKey: "id",
      as: "event"
    });
  };
  return favorites;
};
