const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        description:{
            type: String,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        state:{
            type: String,
            default: 'No disponible'
        }
    },{timestamps: true}
)

module.exports = mongoose.model("Product", ProductSchema);