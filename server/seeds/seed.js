// Description: This file is used to seed the database with dummy data.
// It imports the necessary modules and models, connects to MongoDB, clears the existing data, seeds the database with users, problems, comments, and solutions, and closes the connection.
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Problem from "../models/Problem.js";
import Comment from "../models/Comment.js";
import Medal from "../models/Medal.js";
import seedUsers from "./userSeeds.js";
import seedProblems from "./problemSeeds.js";
import seedCommentsAndSolutions from "./commentSeeds.js";
import seedMedals from "./medalsSeeds.js";
// Load environment variables from the .env file.
dotenv.config();
// Create an async function to seed the database.
const seedDatabase = async () => {
  try {
    // Connect to MongoDB.
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost/tweetcodedb",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Connected to MongoDB successfully");

    // Clear existing data.
    await User.deleteMany({});
    await Problem.deleteMany({});
    await Comment.deleteMany({});
    await Medal.deleteMany({});
    console.log("Existing data cleared");

    // Seed users.
    await seedUsers();
    console.log("Users seeded successfully");

    // Seed problems.
    await seedProblems();
    console.log("Problems seeded successfully");

    // Seed comments and solutions.
    await seedCommentsAndSolutions();
    console.log("Comments and solutions seeded successfully");

    // Seed medals.
    await seedMedals();
    console.log("medals seeded successfully");

    // Close the connection.
    await mongoose.connection.close();
    console.log("MongoDB connection closed");

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    await mongoose.connection.close();
    process.exit(1);
  }
};
// Call the async function to seed the database.
seedDatabase();
