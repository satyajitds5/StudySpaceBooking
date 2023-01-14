const mongoose = require("mongoose");

// A schema for booking the Space

const bookingSchema = new mongoose.Schema(
  {
    space: {
      type: mongoose.Schema.ObjectId,
      ref: "spaces",
      require: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      require: true,
    },
    seats: {
      type: Array,
      require: true,
    },
    transactionId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookings", bookingSchema);
