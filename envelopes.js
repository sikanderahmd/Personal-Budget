const express = require('express');
const envelopeRouter = express.Router()



envelopeRouter.get('/', (req, res, next) => {
    res.send('Working envelopes route');
})



module.exports = envelopeRouter;