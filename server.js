// Import Express and the routes
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
// const notesRoutes = require('./routes/notesRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile)

// Set up the server
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Middleware
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// API Route for notes
app.get('/api/notes', (req, res) => {
  readFileAsync('./db/db.json', 'utf8').then((data) => {
    notes = [].concat(JSON.parse(data))
    res.json(notes);
  })
});

// API Route | Post request
app.post('/api/notes', (req, res) => {
  const note =req.body;
  readFileAsync('./db/db.json', 'utf8').then((data) => {
    const notes = [].concat(JSON.parse(data));
    note.id = notes.length + 1;
    notes.push(note);
    return notes
  }).then((notes) => {
    writeFileAsync('./db/db.json', JSON.stringify(notes))
    res.json(note)
  });
});

// API Route | Delete request
app.delete('/api/notes/:id', (req, res) => {
  const noteToDelete = parseInt(req.params.id);
  readFileAsync('./db/db.json', 'utf8').then((data) => {
    const notes =[].concat(JSON.parse(data));
    const newNotes = [];
    for (var i = 0; i < notes.length; i++) {
      if(noteToDelete !== notes[i].id) {
        newNotes.push(notes[i]);
      };
    };
    return newNotes
  }).then((notes) => {
    writeFileAsync('./db/db.json', JSON.stringify(notes));
    res.send('saved success!!!');
  });
})

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
