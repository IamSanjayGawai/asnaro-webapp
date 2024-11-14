import mongoose from "mongoose";

const city_masterSchema = new mongoose.Schema({
  code: Number,
  zipcode: Number,
  state: String,
  city: String,
  town: String,
  city_revised: String,
  area: String,
});

const Location = mongoose.model("City_Master", city_masterSchema);

export default Location;
