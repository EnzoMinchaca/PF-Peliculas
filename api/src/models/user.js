const { Schema, model } = require("mongoose")

const userSchema = Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true
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
        }
    }
)

module.exports = model("User", userSchema)