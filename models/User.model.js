// User model here

const {
    Schema,
    model
} = require('mongoose');

const userSchema = new Schema({
        username: {
            type: String,
            trim: true,
            required: [true, 'Username is required.'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
            unique: true,
            trim: true,
            lowercase: true
        },
        passwordHash: {
            type: String,
            required: [true, 'Password is required.']
        }
    },

    {
        timestamps: true
    }
);
const userModel = model('User', userSchema)

module.exports = userModel