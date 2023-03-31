// Import Express and required modules
const htmlRoute = require('express').Router();
const path = require('path');

// HTML Routes 
htmlRoute.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
  
htmlRoute.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// Catch all route
htmlRoute.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Export this route 
module.exports = htmlRoute;