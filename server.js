const express = require('express');
const app = express();


const envelopeRouter = require('./envelopes');
app.use('/envelopes', envelopeRouter);


app.listen(4001, () => {
    console.log('Listening at port 4001')
})