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
  email: {
    type: String,
  },
  password: {
    type: String
  },
  mobileNumber: {
    type: String,
  },
  isMobileVerified: {
    type: Boolean,
    default: false
  },
  gender: {
    type: String,
  },
  fullAddress: {
    type: String
  },
  pinCode: {
    type: Number
  },
  city: {
    type: String,
  },
  locality: {
    type: String
  },
  order: [],
  wishlist: []
}, { timestamps: true });

const UserSchema = Mongoose.model("Users", userSchema);
userSchema.plugin(mongooseAggregatePaginate);
userSchema.plugin(mongoosePaginate);

module.exports = UserSchema;