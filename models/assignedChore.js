module.exports = (sequelize, DataTypes) => {
  const AssignedChore = sequelize.define('AssignedChore', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  AssignedChore.associate = (models) => {
    // We're saying that a AssignedChore should belong to a Child and to a Chore
    AssignedChore.belongsTo(models.Child, {
      foreignKey: {
        allowNull: false,
      },
    });
    AssignedChore.belongsTo(models.Chore, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return AssignedChore;
};
