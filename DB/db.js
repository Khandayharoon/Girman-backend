// db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// MongoDB connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

// Define user schema
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true }, // Make first_name required
  last_name: { type: String, required: true }, // Make last_name required
  city: { type: String },
  contact_number: { type: String, required: true }, // Changed to String for flexibility
  image_link: { type: String },
});

// Export the model
const User = mongoose.model("User", userSchema);
// Export the connection function

module.exports = { User, connectDB };
