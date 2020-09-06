const submitButton = document.getElementById('edit-quote');
const quoteContainer = document.getElementById('new-quote');

submitButton.addEventListener('click', () => {
    const quote = document.getElementById('quote').value;
    const person = document.getElementById('person').value;
    const id = document.getElementById('id').value;
    fetch(`/api/quotes/${id}?quote=${quote}&person=${person}`, {method: 'PUT'})
    .then(response => response.json())
    .then((quote) => {
        const displayQuote = document.createElement('div');
        displayQuote.innerHTML = `
            <h3>The quote has been successfully updated:</h3>
            <div class="quote-text">${quote.quote}</div>
            <div class="attribution">- ${quote.person}</div>
            <p>Go to the <a href="index.html">home page</a> to request and view all quotes</p> 
        `
        quoteContainer.appendChild(displayQuote);
    })
})