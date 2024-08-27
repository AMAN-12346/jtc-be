import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const productSchema = new Schema({
    ownerName: {
        type: String,
        
    },
    email: {
        type: String,
        
    },
    phoneNo: {
        type: Number,
        
    },
    whatsAppNo: {
        type: Number,
        
    },
    category: {
        type: String,
        
    },
    address: {
        type: String,
        
    },
    city: {
        type: String,
        
    },
    state: {
        type: String,
        
    },
    pincode: {
        type: Number,
        
    },
    companyName: {
        type: String,
        
    },
    productDescription: {
        type: String,
        
    },
    gstNumber: {
        type: String,
        
    },
    productImages: {
        type: String,
        
    },
    bannerImage: {
        type: String,
        
    },
    isApproved: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true })

const ProductSchema = Mongoose.model("Product", productSchema)
productSchema.plugin(mongooseAggregatePaginate)
productSchema.plugin(mongoosePaginate);
module.exports = ProductSchema;