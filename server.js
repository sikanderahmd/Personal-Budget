const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const prompt = require('prompt-sync')


const envelopeRouter = require('./envelopes');
app.use('/envelopes', envelopeRouter);


app.listen(4001, () => {
    console.log('Listening at port 4001')
})