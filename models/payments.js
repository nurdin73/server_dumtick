'use strict';
module.exports = (sequelize, DataTypes) => {
  const payments = sequelize.define (
    'payments',
    {
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.STRING,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
      event_id: DataTypes.INTEGER,
      buyer_id: DataTypes.INTEGER,
    },
    {}
  );
  payments.associate = function (models) {
    // associations can be defined here
    payments.belongsTo (models.users, {
      foreignKey: 'buyer_id',
      as: 'buyer',
      sourceKey: 'id',
    });
    payments.belongsTo (models.events, {
      foreignKey: 'event_id',
      as: 'event',
      sourceKey: 'id',
    });
  };
  return payments;
};
