import { User } from "../models/User.js";
import bcrypt, { hash } from 'bcrypt';



// register route
export const register = async (req, res, next) => {

    const { username, password, email } = req.body;


    try {

        // console.log(req.body);
        // const salt = bcrypt.genSaltSync(10);
        // const hashedPassword = bcrypt.hashSync(password, salt)

        // console.log(password + "\n" + hashedPassword)
        console.log("before", req.body)
        const user = await User.create({
            username, email, password
        });

        res.status(201).json({
            success: true,
            user: user
        });

    } catch (error) {
        res.send({ status: 500, message: error })
    }

}

// login route
export const login = async (req, res, next) => {

    const { email, password } = req.body;

    if (!email && !password)  res.status(401).json({ success: false, error: "Please provide email and password" })

    try {
        const user = await User.findOne({ email }).select('password');

        if (!user) res.status(404).json({ success: false, error: "User not found" })

        const isMatch = await user.matchPassword(password);

        if (!isMatch)  res.status(400).json({ success: true, error: "password doesn't match" })


        res.status(200).json({
            success: true,
            "token": "abc90909token090xy"
        })
        
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }


}

// forget password route
export const forgetPassword = async (req, res, next) => {

}

// reset password route
export const resetPassword = async (req, res, next) => {

}