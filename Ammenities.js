module.exports = (sequelize, DataTypes) => {
    const Ammenities = sequelize.define("Ammenities", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    });
  
    Ammenities.associate = (models) => {
      Ammenities.belongsTo(models.PropertyRoom, {
        foreignKey: "property_room_id",
        onDelete: "CASCADE",
        unique: true,
      });
  
      Ammenities.belongsTo(models.AmmenitiesList, {
        foreignKey: "ammenities_list_id",
        onDelete: "CASCADE",
      });
    };
  
    return Ammenities;
  };
  