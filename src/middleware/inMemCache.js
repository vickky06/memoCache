const NodeCache = require("node-cache");
const stdTTL = process.env.STDTTL || 20;
const checkperiod = process.env.CHECKPERIOD || 120
const cache = new NodeCache({ stdTTL, checkperiod });


const verifyCache = (req, res, next) => {
    try {
        const startTime = new Date().getTime();
        const { id } = req.params;
        if (cache.has(id)) {
            const tt = new Date().getTime() - startTime;
            return res.status(200).json({...val,tt});
        }
        return next();
    } catch (err) {
        throw new Error(err);
    }
};

const setCache = (id, data) => cache.set(id, data);

module.exports = {
    setCache,
    verifyCache
}