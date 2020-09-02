const express = require('express');
const quoteRouter = express.Router();
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');
const { response } = require('express');

//route for random quote
quoteRouter.get('/random', (req, res, next) => {
    res.status(200).send({
        quote: getRandomElement(quotes)
    });
})



//GET route for all quotes array
quoteRouter.get('/', (req, res, next) => {
    if (req.query.person) {
        const quotesByAuthor = quotes.filter(quote => {
            return quote.person === req.query.person;
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
            quote: req.query.quote,
            person: req.query.person
        };
        quotes.push(newQuote);
        res.status(201).send({quote: newQuote});
    } else {
        res.status(400).send('Invalid request');
    }
})

module.exports = quoteRouter;