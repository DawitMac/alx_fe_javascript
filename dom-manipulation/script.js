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

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    quotes = storedQuotes;
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
    const quotesJson = JSON.stringify(quotes);
    const blob = new Blob([quotesJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = quotes.map(quote => quote.category);
    const uniqueCategories = [...new Set(categories)];

    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    
    displayQuotes(filteredQuotes);
    localStorage.setItem('selectedCategory', selectedCategory);
}

// Function to display filtered quotes
function displayQuotes(quotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';

    quotes.forEach(quote => {
        const quoteDiv = document.createElement('div');
        quoteDiv.innerHTML = `<p><strong>Category:</strong> ${quote.category}</p>
                              <p><em>${quote.text}</em></p>`;
        quoteDisplay.appendChild(quoteDiv);
    });
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}
function fetchQuotesFromServer() {
    // Simulated fetching data from a mock API
    // Replace this with an actual API endpoint
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            // Update local data with data from the server
            quotes = data;
            saveQuotes();
            showRandomQuote();
            console.log('Data fetched from the server:', data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


function syncWithServer() {
    fetchFromServer(); 

}

function handleConflicts(localData, serverData) {
   
}

document.addEventListener('DOMContentLoaded', function() {
    loadQuotes();
    showRandomQuote();
    createAddQuoteForm();
    populateCategories();
    
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('exportButton').addEventListener('click', exportToJsonFile);
    document.getElementById('importFile').addEventListener('change', importFromJsonFile);
    const selectedCategory = localStorage.getItem('selectedCategory') || "all";
    document.getElementById('categoryFilter').value = selectedCategory;
    filterQuotes();
    setInterval(syncWithServer, 60000);
});


