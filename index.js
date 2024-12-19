require("dotenv").config();
const express = require('express');
const { sequelize } = require('./models');
const routes = require('./routes');
const responseHandler = require("./middleware/responseHandler");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.all("*", (req, res, next) => {
    res.status(400);
    res.locals.rc = "400";
    res.locals.msg = "Bad Request";
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("", routes);
app.use(responseHandler);

const PORT = process.env.EXPRESS_PORT || 8080;

sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log("Server has started successfully!");
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    });
