// Array to store quotes
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivational" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Technology" },
    { text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.", category: "Motivational" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p><strong>Category:</strong> ${randomQuote.category}</p>
                              <p><em>${randomQuote.text}</em></p>`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    
    if (newQuoteText !== '' && newQuoteCategory !== '') {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        showRandomQuote();
        
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    } else {
        alert('Please enter both the quote text and category.');
    }
}

// Function to create a form for adding new quotes
function createAddQuoteForm() {
    const formDiv = document.createElement('div');
    formDiv.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;
    
    document.body.appendChild(formDiv);
}

document.addEventListener('DOMContentLoaded', function() {
    showRandomQuote();
    createAddQuoteForm();
});