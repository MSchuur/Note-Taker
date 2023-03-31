
const notesRoute = require('express').Router();
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// API Route for notes
notesRoute.get('/notes', (req, res) => {
    readFileAsync('./db/db.json', 'utf8').then((data) => {
      notes = [].concat(JSON.parse(data))
      res.json(notes);
      console.log(notes)
    })
  });
  
  // API Route | Post request
  notesRoute.post('/notes', (req, res) => {
    const note =req.body;
    readFileAsync('./db/db.json', 'utf8').then((data) => {
      const notes = [].concat(JSON.parse(data));
      note.id = notes.length + 1;
      notes.push(note);
      console.log(notes);
      return notes
    }).then((notes) => {
      writeFileAsync('./db/db.json', JSON.stringify(notes))
      res.json(note)
    });
  });
  
  // API Route | Delete request
  notesRoute.delete('/notes/:id', (req, res) => {
    const noteToDelete = parseInt(req.params.id);
    readFileAsync('./db/db.json', 'utf8').then((data) => {
      const notes =[].concat(JSON.parse(data));
      const newNotes = [];
      for (var i = 0; i < notes.length; i++) {
        if(noteToDelete !== notes[i].id) {
          newNotes.push(notes[i]);
        };
      };
      console.log(newNotes);
      return newNotes
    }).then((notes) => {
      writeFileAsync('./db/db.json', JSON.stringify(notes));
      res.send('saved success!!!');
    });
  })


  module.exports = notesRoute;