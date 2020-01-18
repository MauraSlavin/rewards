module.exports = (sequelize, DataTypes) => {
  const kid = sequelize.define('Kid', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });

  kid.associate = (models) => {
    // A kid belongs to one or two parents
    kid.belongsTo(models.Parent, {
      as: 'Parent1',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return kid;
};
