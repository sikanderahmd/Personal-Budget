const express = require('express');
const envelopeRouter = express.Router()


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

envelopeRouter.post('/transfer/:sender/:receiver', (req, res, next) => {
    const senderId = req.params.sender;
    const receiverId = req.params.receiver;

    const senderIndex = envelopes.findIndex(envelope => {
        return envelope.id === Number(senderId)
    })
    const receiverIndex = envelopes.findIndex(envelope => {
        return envelope.id === Number(receiverId)
    })

    const transferAmount = Number(req.query.transferAmount);

    if(senderIndex !== -1 && receiverIndex !== -1){
        if(envelopes[senderIndex].budget >= transferAmount){
            envelopes[senderIndex].budget -= transferAmount;
            envelopes[receiverIndex].budget += transferAmount;
            res.send(envelopes)
        }
        else { 
            res.status(404).send('Insufficient balance in sender account!')
        }
        
    }
    else {
        res.status(404).send('Sender or receiver ID invalid!')
    }
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

envelopeRouter.delete('/:envelopeId', (req, res, next) => {
    const envelopeId = req.params.envelopeId;
    const envelopeIndex = envelopes.findIndex(envelope => {
        return envelope.id === Number(envelopeId);
    })
    if(envelopeIndex !== -1){
        envelopes.splice(envelopeIndex, 1);
        res.status(204).send(envelopes)
    }
    else {
        res.status(500).send()
    }
})


module.exports = envelopeRouter;