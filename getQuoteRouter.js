const express = require('express');
const quoteRouter = express.Router();
const { quotes } = require('./data');
const { getRandomElement, generateId } = require('./utils');
const { response, query } = require('express');

//route for random quote
quoteRouter.get('/random', (req, res, next) => {
    res.status(200).send({
        quote: getRandomElement(quotes)
    });
})



//GET route for all quotes, and by author
quoteRouter.get('/', (req, res, next) => {
    if (req.query.person !== undefined) {
        const quotesByAuthor = quotes.filter(quote => {
            return quote.person.toLowerCase() === req.query.person.toLowerCase();
        });
        res.status(200).send({quotes: quotesByAuthor});
    } else {
        res.status(200).send({quotes: quotes.map(quote => { return quote;})});
    }
})

//POST route for adding more quotes
quoteRouter.post('/', (req, res, next) => {
    if (req.query.quote && req.query.person) {
        const newQuote = {
            id: generateId(quotes),
            quote: req.query.quote,
            person: req.query.person
        };
        quotes.push(newQuote);
        res.status(201).send(newQuote);
    } else {
        res.status(400).send('Invalid request');
    }
})

//DELETE route for chosen quote by Id
quoteRouter.delete('/:id', (req, res, next) => {
    const quoteIndex = quotes.findIndex(quote => { return quote.id === Number(req.params.id) });
    if (quoteIndex !== -1) {
        res.status(200).send(quotes[quoteIndex]);
        quotes.splice(quoteIndex, 1);
    } else {
        res.status(404).send('There is no quote with such id');
    }
})

//PUT route for quote by Id
quoteRouter.put('/:id', (req, res, next) => {
    const quoteIndex = quotes.findIndex(quote => { return quote.id === Number(req.params.id) });
    if (quoteIndex !== -1) {
        const chosenQuote = {
            id: quotes[quoteIndex].id,
            quote: req.query.quote,
            person: req.query.person
        }
        quotes.splice(quoteIndex, 1, chosenQuote);
        res.status(200).send(chosenQuote);
    } else {
        res.status(404).send('Not found');
    }
})

module.exports = quoteRouter;