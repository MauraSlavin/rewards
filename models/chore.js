module.exports = (sequelize, DataTypes) => {
  const Chore = sequelize.define('Chore', {
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
  });
  return Chore;
};