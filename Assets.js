
module.exports = (sequelize, DataTypes) => {
    const Assets = sequelize.define("Assets", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique:true
        },
        file_path:{
            type: DataTypes.STRING,
            allowNull: false
        },
        asset_type:{
            type: DataTypes.STRING,
            allowNull: false
        }
      
      
    })

    Assets.associate = (models) => {
        Assets.belongsTo(models.PropertyRoom, {
           foreignKey: "room_id",
           onDelete:"CASCADE",
        })
    }

    return Assets
}

