import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
