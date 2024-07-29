import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  guestEmail: {
    type: String,
  },
  meetinglocation: {
    type: String,
  },
  meetingLink: {
    type: String,
  },
  companyName: {
    type: String,
  },
  companyCountry: {
    type: String,
  },
  websiteUrl: {
    type: String,
  },
  expectedTime: {
    type: String,
  },
  projectPhase: {
    type: String,
  },
  meetingTime: {
    type: String,
  },
  message: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  intrestedIn: {
    type: String,
  },

}, { timestamps: true });

const UserSchema = Mongoose.model("Users", userSchema);
userSchema.plugin(mongooseAggregatePaginate);
userSchema.plugin(mongoosePaginate);

module.exports = UserSchema;