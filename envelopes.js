const express = require('express');
const envelopeRouter = express.Router()
const prompt = require('prompt-sync')


const envelopes = 
[{id: 1, name: 'Fuel', budget: 30000}, 
{id: 2, name: 'Groceries', budget: 20000},
{id: 3, name: 'Rent', budget: 40000}]


envelopeRouter.get('/', (req, res, next) => {
    res.send(envelopes);
})

envelopeRouter.get('/:envelopeId', (req, res, next) => {
    const envelopeId = req.params.envelopeId;
    const envelopeIndex = envelopes.findIndex(envelope => {
        return envelope.id === Number(envelopeId);
    })
    if(envelopeIndex !== -1){
        res.send(envelopes[envelopeIndex])
    }
    else {
        res.status(404).send()
    }
})

envelopeRouter.post('/', (req, res, next) => {
    const newEnvelope = req.body;
    envelopes.push(newEnvelope);
    res.status(200).send(envelopes);
})

envelopeRouter.put('/:envelopeId', (req, res, next) => {
    const envelopeId = req.params.envelopeId;
    const envelopeIndex = envelopes.findIndex(envelope => {
        return envelope.id === Number(envelopeId);
    })
    if(envelopeIndex !== -1){
        const withdrawl = req.query.withdrawl
        envelopes[envelopeIndex].budget -= withdrawl;
        res.send(envelopes);
    }
    else {
        res.status(404).send('Envelope not found!')
    }

})


module.exports = envelopeRouter;