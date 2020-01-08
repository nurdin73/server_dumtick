"use strict";
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    "categories",
    {
      name: DataTypes.STRING,
      img: DataTypes.STRING
    },
    {}
  );
  categories.associate = function(models) {
    // associations can be defined here
    categories.hasMany(models.events, {
      as: "category",
      foreignKey: "category_id"
    });
  };
  return categories;
};
