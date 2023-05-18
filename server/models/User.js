import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

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
        // minLength: 6,
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

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


export const User = mongoose.model('User', userSchema)


