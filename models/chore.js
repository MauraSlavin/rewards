module.exports = (sequelize, DataTypes) => {
  const Chore = sequelize.define('Chore', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    iconfile: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'wash_dish.png',
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
  return Chore;
};
