import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"]
    },
    email: {
        type: String,
        required: [true, "Please provide email address"],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add password"],
        minlength: 4,
        select: false
    },

}, { timeStamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next()
    };
    const salt = await bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt)
    next()
});

userSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.getSignedToken = async function () {
    return await jwt.sign({ id: this._id }, "999ppp000kkk", { expiresIn: "10Min" })
}

export const User = mongoose.model('User', userSchema)





