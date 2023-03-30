// Import Express.js
const express = require('express');
const api = require('./routes/index.js');
// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3001;

// Set up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Set up Express to handle routes
require('./routes/notesRoutes')(app);
require('./routes/htmlRoutes')(app);

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
