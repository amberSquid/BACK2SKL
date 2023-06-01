const {Location, Properties} = require("../models")


const createProperty = async (req, res) => {
    const {
      property_name,
      property_type,
      property_description,
      ratings,
      image,
      num_rooms,
      longitude,
      latitude,
      street_address,
      location_name,
    } = req.body;
  
    try {
      // Creating location record
      const newLocation = await Location.create({
        longitude,
        latitude,
        street_address,
        location_name,
      });
  
      // Creating property record and associating it with the location
      const newProperty = await Properties.create({
        property_name,
        property_type,
        property_description,
        ratings,
        image,
        num_rooms,
      });
  
      // Associate the property with the location
      await newProperty.setLocation(newLocation);
  
      // Fetch the property with the associated location
      const propertyWithLocation = await Properties.findByPk(newProperty.id, {
        include: Location,
      });
  
      res.status(200).send({ property: propertyWithLocation });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "An error occurred while creating the product" });
    }
  };

  const getAllProperties = async (req, res) => {
    const currentProperties = await Properties.findAll({})
  
    const propertiesWithLocation = await Promise.all(currentProperties.map(async item => {
      const location = await Location.findOne({
        where: {
          id: item.location_id
        }
      })
  
      const propertyWithLocation = {
        property: item,
        location: location
      }
  
      return propertyWithLocation
    }))
  
    res.json({ properties: propertiesWithLocation })
  }
  

const getProperty = async (req, res) => {
  const { id } = req.params;
  const property = await Properties.findByPk(id, {
    where:{
      id
    }
  })

const location = await Location.findOne({
  where:{id:property.location_id}
})

const finalResult = {
  property,
  location
}

  return res.status(200).json({property: finalResult})

}

const filterProperty = async (req, res) => {
  const {propertyType} = req.params;
  console.log(propertyType)

  const selectedProperty = await Properties.findAll({
    where:{
      property_type: propertyType
    }
  })

  return res.status(200).json({selectedProperty:selectedProperty})

}


  

module.exports = {createProperty, getAllProperties, getProperty, filterProperty}