import mongoose from "mongoose";

const IconSchema = new mongoose.Schema({
  iconName: {
    type: String,
    required: true,
  },
  iconSet: {
    type: String,
    required: true,
  },
  JSX: {
    type: String,
    required: true,
  },
  HTML: {
    type: String,
    required: true,
  },
});

export const Icon = mongoose.models.Icon || mongoose.model("Icon", IconSchema);
