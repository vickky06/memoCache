const express = require("express");
const router = require('./orchestrator/router')
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(router);
const PORT = process.env.PORT || 5000;
((PORT) => {
    try {
        app.listen(PORT, () => console.log(`SERVER STARTED at ${PORT}`));

    }
    catch (e) {
        console.log(e);
        process.exit();
    }
})(PORT);
