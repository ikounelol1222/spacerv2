
// Tab Cloaker
function changeTab() {
    const option = document.getElementById('cloak-option').value;
    document.title = option;
    
    // Change favicon based on selected option
    let faviconURL = "https://www.google.com/favicon.ico"; // Default Google favicon
    
    if (option === "Google Classroom") {
        faviconURL = "https://ssl.gstatic.com/classroom/favicon.png";
    } else if (option === "EZ Puzzle") {
        faviconURL = "https://www.ezschool.com/favicon.ico";
    } else if (option === "Google Docs") {
        faviconURL = "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";
    } else if (option === "Canvas") {
        faviconURL = "https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico";
    }
    
    const favicon = document.querySelector("link[rel='icon']");
    favicon.href = faviconURL;
}

// Panic Button - Quickly navigate to Google Classroom
function panicMode() {
    window.location.href = "https://classroom.google.com";
}

// Search Content
function searchContent() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    
    // Scroll to the section that matches the query
    if (query.includes("game") || query.includes("play")) {
        document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
    } else if (query.includes("browser") || query.includes("search") || query.includes("private")) {
        document.getElementById('browser').scrollIntoView({ behavior: 'smooth' });
    } else if (query.includes("movie") || query.includes("video") || query.includes("watch")) {
        document.getElementById('movies').scrollIntoView({ behavior: 'smooth' });
    } else if (query.includes("tool") || query.includes("code") || query.includes("calculator")) {
        document.getElementById('tools').scrollIntoView({ behavior: 'smooth' });
    } else {
        // Use the query in the browser search if no section matches
        document.getElementById('search-query').value = query;
        document.getElementById('browser').scrollIntoView({ behavior: 'smooth' });
    }
}

// Search Games
function searchGames() {
    const query = document.getElementById('game-search-bar').value.toLowerCase();
    const games = document.querySelectorAll('.game');
    
    games.forEach(game => {
        const title = game.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
            game.style.display = "block";
        } else {
            game.style.display = "none";
        }
    });
}

// Run Code in the playground
function runCode() {
    const code = document.getElementById('codeInput').value;
    const iframe = document.getElementById('output');
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();
}

// Search Google Function
function searchGoogle() {
    const input = document.getElementById('search-query').value;
    
    // Check if input is a valid URL
    let url;
    try {
        url = new URL(input);
        // If it's a URL without protocol, add https://
        if (!input.includes('://')) {
            url = new URL('https://' + input);
        }
    } catch {
        // If not a valid URL, treat as a Google search
        url = new URL(`https://www.google.com/search?q=${encodeURIComponent(input)}`);
    }
    
    // Show preview message
    document.getElementById('search-preview').style.display = 'block';
    
    // Open in a new tab
    window.open(url.toString(), '_blank');
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Alt+P for panic button
    if (event.altKey && event.key === 'p') {
        panicMode();
    }
    
    // Alt+S for search focus
    if (event.altKey && event.key === 's') {
        document.getElementById('search-bar').focus();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set default tab title and favicon
    changeTab();
    
    // Add event listener for Enter key in search bars
    document.getElementById('search-bar').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchContent();
        }
    });
    
    document.getElementById('game-search-bar').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchGames();
        }
    });
    
    document.getElementById('search-query').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchGoogle();
        }
    });
});
