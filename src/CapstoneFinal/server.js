const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// In-memory user data storage (for demonstration purposes)
const users = [];

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle user registration
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Validate input (add more validation as needed)
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please fill in all fields.' });
    }

    // Check if the email is already registered
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Store user data (you should hash the password in a real-world scenario)
    users.push({ username, email, password });

    // Redirect to the home page (for demonstration purposes)
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
