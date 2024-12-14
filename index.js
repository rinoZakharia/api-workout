require("dotenv").config();
const express = require('express');
const syncDatabase = require('./syncDatabase');
const routes = require('./routes')
const app = express();

async function startServer() {
    try {
        await syncDatabase();

        app.use(routes);

        const PORT = process.env.EXPRESS_PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error during database sync:', error);
        process.exit(1);
    }
}

startServer()
    .then(() => {
        console.log("Server has started successfully!");
    })
    .catch((error) => {
        console.error("Server startup failed:", error);
    });
