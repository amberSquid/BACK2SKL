const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Users, Login } = require("../models");

const registerUser = async (req, res) => {
  const { first_name, last_name, gender, dob, nationality, email, password } = req.body;

  try {
    // Check if email already exists
    const emailExist = await Login.findOne({ where: { email } });

    if (emailExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user record
    const newUser = await Users.create({
      firstName: first_name,
      lastName: last_name,
      gender,
      dob,
      nationality,
      isAdmin: false,
    });
console.log(newUser.id)
    // Create login record and associate it with the user
    const newLogin = await Login.create({
      email,
      password: hashedPassword,
      user_id: newUser.id, // Associate the login record with the user ID
    });

    const token = jwt.sign({ userId: newUser.id }, "secret", {
      expiresIn: "24h",
    });

    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while registering" });
  }
};



const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    console.log(email);
  
    try {
      // Find the login record with the provided email
      const login = await Login.findOne({ where: { email } });
  
      console.log(login);
  
      if (!login) {
        return res.status(400).json({ msg: "Email doesn't exist" });
      }
  
      // Compare the provided password with the hashed password stored in the login record
      const isPasswordValid = await bcrypt.compare(password, login.password);
  
      console.log(login.password, password);
      console.log(isPasswordValid);
  
      if (!isPasswordValid) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
  
      // Find the associated user record
      const user = await Users.findByPk(login.user_id);
  
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, process.env.AUTH_SECRET, {
        expiresIn: "24h",
      });
  
      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while logging in" });
    }
  };
  




module.exports = { registerUser, loginUser };