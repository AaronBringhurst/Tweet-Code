// Imports for ESM.
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import DonationTransaction from "./DonationTransaction.js";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  coins: {
    type: Number,
    default: 0,
  },
  problems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Problem",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  donationTransactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "DonationTransaction",
    },
  ],
  avatar: {
    type: String,
    default: "https://example.com/default-avatar.png", // Set a default avatar URL
  },
});

// Set up pre-save middleware to create password.
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Compare the incoming password with the hashed password.
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
