// Import Express and the routes
const express = require('express');
const api = require('./routes/notesRoute');
const htmlRoute = require('./routes/htmlRoute');

// Set up the servercd
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Express to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Middleware
app.use(express.static('public'));

app.use('/api', api);
app.use('/', htmlRoute);

// Listening for incoming connections on the specified port 
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
