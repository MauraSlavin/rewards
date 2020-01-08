module.exports = (sequelize) => {
  const DoneChore = sequelize.define('DoneChore', {
    // only has id (PRIMARY KEY) & 2 foreign keys (below), so nothing needed here.
  });

  DoneChore.associate = function (models) {
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
