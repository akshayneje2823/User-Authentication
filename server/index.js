import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'


// config file
dotenv.config({path:'./config/.env'});

const app = express();
app.use(cors())

app.get('/', async (req, res) => {
    res.send('<h1>Hello</h1>');

    console.log(req.params)
})

app.listen(process.env.PORT, () => {
    console.log("server is running " + process.env.PORT)
})
