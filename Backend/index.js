const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection with proper error handling and retry mechanism
const dbUri = process.env.MONGODB_URI || "mongodb+srv://aryanm3124:aWWDPdvXbR4khKML@cluster0.ywimhqt.mongodb.net/Placements";

const connectWithRetry = () => {
  console.log('Attempting to connect to MongoDB...');
  mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
  });
};

connectWithRetry();

// Default route
app.get("/", (req, res) => {
  res.send("Express App is Running");
});





const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
    default: {},
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Users = mongoose.model('Users', userSchema);

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let check = await Users.findOne({ email });
    if (check) {
      return res.status(400).json({ success: false, message: "Existing user found with same email id" });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      cartData: cart,
    });

    await user.save();

    const data = {
      user: {
        id: user._id,
      }
    };

    const token = jwt.sign(data, process.env.JWT_SECRET || 'secret_ecom'); // Use environment variable for secret
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post('/login', async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      const passCompare = await bcrypt.compare(req.body.password, user.password);
      if (passCompare) {
        const data = {
          user: {
            id: user._id
          }
        };
        const token = jwt.sign(data, process.env.JWT_SECRET || 'secret_ecom'); // Use environment variable for secret
        res.json({ success: true, token });
      } else {
        res.status(400).json({ success: false, errors: "Wrong Password" });
      }
    } else {
      res.status(400).json({ success: false, errors: "Wrong Email Id" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const fetchUser = async (req,res,next) =>{
   const token = req.header('auth-token');
   if(!token){
    res.status(401).send({errors: "Please authenticate using valid token"})
   }
   else{
    try{
      const data = jwt.verify(token,'secret_ecom');
      req.user = data.user;
      next();
    }catch(error){
      res.status(401).send({errors: "please authenticate using a valid token"})
    }
   }
}



// Start server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.log("Error: " + error);
  }
});





