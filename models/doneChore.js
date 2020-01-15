module.exports = (sequelize, DataTypes) => {
  const DoneChore = sequelize.define('DoneChore', {
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

  DoneChore.associate = (models) => {
    // We're saying that a DoneChore should belong to a Child and to a Chore
    DoneChore.belongsTo(models.Child, {
      foreignKey: {
        allowNull: false,
      },
    });
    DoneChore.belongsTo(models.Chore, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return DoneChore;
};
