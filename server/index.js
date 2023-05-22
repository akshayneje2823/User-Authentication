import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import router from  './routes/authRoute.js';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/error.js';

// config file
dotenv.config({path:'./config/.env'});

const app = express();

// to read req.body data
app.use(express.json());
app.use(cors());

// connect DB
connectDB()


// router
app.use('/api/auth',router)

app.use(errorHandler)

const server = app.listen(process.env.PORT, () => {
    console.log("server is running " + process.env.PORT)
})


//any error occur
process.on("unhandledRejection",(err,promise)=>{
    console.log(`Logged Error: ${err}`);
    server.close(()=>process.exit(1))
})

