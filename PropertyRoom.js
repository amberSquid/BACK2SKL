

module.exports = (sequelize, DataTypes) => {
    const PropertyRoom = sequelize.define("PropertyRoom", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false,
            unique:true
        },
        room_type:{
            type: DataTypes.STRING,
            allowNull: false
        },
        num_beds:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        num_baths:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        max_guests:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
       ratings:{
        type: DataTypes.FLOAT,
        allowNull: false
       },
       availability_status:{
        type: DataTypes.BOOLEAN,
        allowNull: false
       },
       description:{
        type: DataTypes.TEXT,
        allowNull: false    
       },
       base_price:{
        type: DataTypes.FLOAT,
        allowNull: false
       }
    })

    PropertyRoom.associate  = (models) => {
        PropertyRoom.belongsTo(models.Properties, {
            foreignKey: "property_id",
            onDelete: "CASCADE",
            unique:true
        })
        PropertyRoom.belongsToMany(models.Ammenities, {
            through: "PropertyRoomAmmenities", 
            foreignKey: "property_room_id",
          });
    }

    return PropertyRoom

}