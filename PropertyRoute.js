const express = require("express")
const { createProperty, getAllProperties, getProperty, filterProperty } = require("../controller/PropertyController")

const router = express.Router()


router.post("/createProperty", createProperty)

router.get("/", getAllProperties)

router.get("/:id", getProperty)

router.get("/filter/:propertyType", filterProperty)



module.exports = router