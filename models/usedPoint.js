module.exports = (sequelize, DataTypes) => {
  const UsedPoint = sequelize.define('UsedPoint', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });

  UsedPoint.associate = (models) => {
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
