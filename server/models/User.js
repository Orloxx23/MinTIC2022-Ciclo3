const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        role:{
            type: String,
        },
        state:{
            type: String,
            default: "Pendiente"
        }, 
        picture: {
            type: String,
            // default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
        }
    },{timestamps: true}
)

module.exports = mongoose.model("User", UserSchema);