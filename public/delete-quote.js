const submitButton = document.getElementById('delete-quote');
const deteledQuoteContainer = document.getElementById('deleted-quote');

submitButton.addEventListener('click', () => {
    const id = document.getElementById('id').value;
    fetch(`/api/quotes/${id}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(quote => {
        console.log(quote);
        const deletedQuote = document.createElement('div');
        deletedQuote.innerHTML = `
        <div class="quote-text">${quote.quote}</div>
        <div class="attribution">- ${quote.person}</div>
        <h3> This quote, no longer exist in database<h3>
        <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
        `;
        deteledQuoteContainer.appendChild(deletedQuote);
    })
});