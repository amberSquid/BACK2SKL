module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
      "Users",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        dob: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        nationality: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
    );
    return Users;
  };