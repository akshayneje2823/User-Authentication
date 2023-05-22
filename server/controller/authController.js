import { User } from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";


// register route
export const register = async (req, res, next) => {

    const { username, password, email } = req.body;

    try {

        // console.log(req.body);
        // const salt = bcrypt.genSaltSync(10);
        // const hashedPassword = bcrypt.hashSync(password, salt)
        // console.log(password + "\n" + hashedPassword)

        const user = await User.create({
            username, email, password
        });

        // res.status(201).json({
        //     success: true,
        //     user: user
        // });

        sendToken(user, 201, res)

    } catch (error) {
        next(error)
    }

}

// login route
export const login = async (req, res, next) => {

    const { email, password } = req.body;


    try {
        if (!email || !password) next(new ErrorResponse("Please provide email and password", 400))

        const user = await User.findOne({ email }).select('+password');
        // console.log(user)

        if (!user) next(new ErrorResponse("User not found", 401));

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) next(new ErrorResponse("password doesn't match", 401))

        // res.status(201).json({
        //     success: true,
        //     "token": "abc90909token090xy"
        // });

        sendToken(user, 200, res)

    } catch (error) {
        next(error)
    }


}

// forget password route
export const forgetPassword = async (req, res, next) => {



};

// reset password route
export const resetPassword = async (req, res, next) => {



};


// sending Token
async function sendToken(user, statusCode, res) {

    let token = await user.getSignedToken();
    // console.log(token)
    res.status(statusCode).json({
        success: true,
        token
    })
};