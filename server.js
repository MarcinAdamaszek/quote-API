const express = require('express');
const app = express();
const quoteRouter = require('./getQuoteRouter')
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
})

// Mount the getRandomQuote router
app.use('/api/quotes', quoteRouter);

