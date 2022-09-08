const { Schema, model } = require("mongoose")
const bcrypt = require('bcrypt')

const userSchema = Schema(
    {
        name: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            unique: true
        },
        isUser: {
            type: Boolean,
            default: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        isOwner: {
            type: Boolean,
            default: false
        },
        isBan: {
            type: Boolean,
            default: false
        },
        token: {
            type: String,
            require: false
        },
        status: {
            type: String, 
            enum: ['Pending', 'Active'],
            default: 'Pending'
        },
        buy: {
            type: Array,
            default: []
       },
        confirmationCode: { 
            type: String, 
            unique: true 
        }, 
    }
)

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports = model("User", userSchema)