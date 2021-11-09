const mongoose = require('mongoose');

const SellSchema = new mongoose.Schema(
    {
        id:{
            type: String,
            unique: true,
            required: true,
        },
        value:{
            type: Number,
            required: true,
        },
        amount:{
            type: Number,
            required: true,
        },
        product:{
            type: Object,
            required: true,
        },
        date:{
            type: String,
            required: true,
        },
        clientId:{
            type: String,
            required: true,
        },
        clientName:{
            type: String,
            required: true,
        },
        sellerId:{
            type: String,
            required: true,
        }, 
        state:{
            type: String,
            default: 'En proceso'
        }
    },{timestamps: true}
)

module.exports = mongoose.model("Sell", SellSchema);