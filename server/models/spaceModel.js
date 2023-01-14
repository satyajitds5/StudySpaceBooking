const mongoose = require("mongoose");
//Schema for Study Space
const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  SpaceID: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
 location:{
  type: String,
  required: true
 },
  
  bookingDate: {
    type: String,
    required: true,
  },
  
  openinghrs: {
    type: String,
    required: true,
  },
  closinghrs: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seatsBooked: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    default: "Functional",
  },
});
module.exports = mongoose.model("spaces", spaceSchema);
