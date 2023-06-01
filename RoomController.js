const {Properties, PropertyRoom, Ammenities, Assets, Booking} = require("../models");
const nodemailer = require("nodemailer");


const createRoom = async (req, res) => {
    const {
      room_type,
      num_beds,
      num_baths,
      max_guests,
      ratings,
      availability_status,
      description,
      base_price,
      property_id,
      items,
      assets,
      asset_type
    } = req.body;
  
    try {
      // Check if the associated property exists
      const property = await Properties.findByPk(property_id);
      if (!property) {
        return res.status(400).json({ error: "Invalid property ID" });
      }
  
      // Create the room record
      const newRoom = await PropertyRoom.create({
        room_type,
        num_beds,
        num_baths,
        max_guests,
        ratings,
        availability_status,
        description,
        base_price,
        property_id,
      });
  
      // Create amenities
      const toAdd = items.map(async (item, index) => {
        const newAmmenities = await Ammenities.create({
          property_room_id: newRoom.id,
          ammenities_list_id: item,
        });
  
        return newAmmenities;
      });
  
      const createdAmmenities = await Promise.all(toAdd);
  
      console.log(createdAmmenities); // Output: Array of created Ammenities records
  
      // Fetch the amenities associated with the room
      const amenities = await Ammenities.findAll({
        where: { property_room_id: newRoom.id },
      });
  
      // Include amenities as part of the room record
      newRoom.dataValues.amenities = amenities;

      //create Images

      const createImage = assets.map(async (item, index) => {
        const newImages = await Assets.create({
          room_id: newRoom.id,
          asset_type,
          file_path: item,
        });
  
        return newImages
      });

      const createdImages = await Promise.all(createImage);

  
console.log("m,smisjijwie", createdImages)

 // Fetch the images associated with the room
 const imgs = await Assets.findAll({
    where: { room_id: newRoom.id },
  });

  // Include imgs as part of the room record
  newRoom.dataValues.assets = imgs;
  
      res.status(201).json({ room: newRoom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while creating the room" });
    }
  };


  const bookNow = async (req, res) => {
    const { room_id, checkIn, checkOut, numGuests, price, subject, receiver, text,  firstName, } = req.body;
  
    try {
      // Check if the room exists
      const room = await PropertyRoom.findByPk(room_id);
      if (!room) {
        return res.status(400).json({ error: "Invalid room ID" });
      }
  
    
  
      // Retrieve the property details for the booked room
      const property = await Properties.findByPk(room.property_id);

        // Create a new booking record
        const booking = await Booking.create({
          room_id,
          check_in: checkIn,
          check_out: checkOut,
          num_guests: numGuests,
          price,
          image:property.image
        });

      console.log(property)
  
      console.log("img", property.image)

      const bookingDetails = {
        booking_id: booking.id,
        room_type: room.room_type,
        check_in: booking.check_in,
        check_out: booking.check_out,
        num_guests: booking.num_guests,
        property_name: property.name,
        property_location: property.location,
        image:property.image,
        price
      };

      // sending mail
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:"keshawnrkmerchant9@gmail.com",
          pass:"nrenubdojuqrothz"
        }
      })

      const details = {
        from: "keshawnrkmerchant9@gmail.com",
        to: receiver,
        subject: subject,
        text: text,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Booking Confirmation</title>
            <style>
              /* Add your custom styling here */
              body {
                font-family: Arial, sans-serif;
              }
              h1 {
                color: #333;
              }
              p {
                margin-bottom: 1em;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
              }
              .thank-you {
                font-weight: bold;
                color: #008000;
              }
             
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Booking Confirmation</h1>
              <p>Dear ${firstName},</p>
              <p>Thank you for booking your dream room with Qatar-Stay. We are pleased to inform you that your booking has been confirmed.</p>
              <p>Booking Details:</p>
              <ul>
                <li>Room Type: ${room.room_type}</li>
                <li>Check-in Date: ${checkIn}</li>
                <li>Check-out Date: ${checkOut}</li>
                <li>Guests: ${numGuests}</li>
                <li>Price: ${price}</li>
              </ul>
              <p>We hope you have a pleasant stay at our property. If you have any questions or need further assistance, please feel free to contact us.</p>
              <p class="thank-you">Thank you for choosing Qatar-Stay!</p>
            </div>
          </body>
          </html>
        `
      };

      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log(err)
        }
        console.log("email has been sent")
      })
  
      return res.status(200).json({ booking: bookingDetails, msg: "message sent" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the booking" });
    }
  };
 
  


  module.exports = { createRoom, bookNow };
  