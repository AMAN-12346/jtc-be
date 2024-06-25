import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const productSchema = new Schema({
    productName: {
        type: String,
    },
}, { timestamps: true })

const ProductSchema = Mongoose.model("Product", productSchema)
productSchema.plugin(mongooseAggregatePaginate)
productSchema.plugin(mongoosePaginate);
export default ProductSchema