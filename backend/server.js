const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();

const userRoute = require("./routes/userRoute");
const cors = require("cors")

app.use(cors())
app.use(express.json())

mongoose
    .connect(process.env.URI)
    .then(() => {
        console.log("connected is successfully")
        app.listen(process.env.PORT || 8800, () => {
            console.log("server is running")
        })
    })
    .catch((error) => {
        console.log("error", error)
    })


app.use(userRoute)
