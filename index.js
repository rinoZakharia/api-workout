require("dotenv").config();
const express = require('express');

const app = express();

const PORT = process.env.PORT;
app.listen(8080, () => console.log(`Running on ${PORT}`))