"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const helmet= require("helmet")

const PORT = 8000;

express()

// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
.use(morgan("tiny"))
.use(express.json())

// Any requests for static files will go into the public folder
.use(express.static("public"))


//Endpoints




//

.get("*", (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
    });
})

// Node spins up our server and sets it to listen on port 8000.
.listen(PORT, () => console.info(`Listening on port ${PORT}`));