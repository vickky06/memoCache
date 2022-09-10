const express = require('express')
const router = express.Router()
const axios = require("axios");
const { setCache, verifyCache } = require('../middleware/inMemCache');
router.get("/", (req, res) => {
    return res.json({ message: "Hello world 🇵🇹" });
});

router.get("/todos/:id", verifyCache, async (req, res) => {
    try {
        const startTime =  new Date().getTime();
        const { id } = req.params;
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
        setCache(id, data);
        return res.status(200).json({...data, time :new Date().getTime()-startTime});
    } catch ({ response }) {
        return res.sendStatus(response.status);
    }
});

module.exports = router;