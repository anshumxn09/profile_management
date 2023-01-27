const express = require('express');
const connection = require('./database/connection');
const router = require('./routes/profileRoutes');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const app = express();

mongoose.set('strictQuery', false);
app.use(express.json());
app.use("/api", router);
app.use("/api", userRouter);

app.get("/", (req, res) => {
    return res.json({
        message : "god is great"
    })
})

const startMyApp = async () => {
    try {
        await connection();
        app.listen(5000, () => {
            console.log('successfully running no error');
        })
    } catch (error) {
        console.log(error)
    }
}

startMyApp();