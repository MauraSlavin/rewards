module.exports = (sequelize) => {
  const UsedPoint = sequelize.define('UsedPoint', {
    // only has id (PRIMARY KEY) & 2 foreign keys (below), so nothing needed here.
  });

  UsedPoint.associate = function (models) {
    // We're saying that a UsedPoint should belong to a Child and to a Chore
    UsedPoint.belongsTo(models.Child, {
      foreignKey: {
        allowNull: false,
      },
    });
    UsedPoint.belongsTo(models.Reward, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return UsedPoint;
};
