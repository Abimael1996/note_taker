const notes = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require("../helpers/fsUtils")

notes.post("/", (req, res) => {
    if(req.body) {
        const {title, text} = req.body;
        const newNote = {
            id: uuidv4(),
            title,
            text
        };
        readAndAppend(newNote, "./db/db.json");
        res.json(newNote);
    } else {
        res.send("error in adding new note");
    }
});

notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.delete("/:id", (req, res) => {
    const param = req.params.id;

    readFromFile("./db/db.json")
      .then((data) => JSON.parse(data))
      .then((json) => {
          const result = json.filter((note) => note.id !== param);
          writeToFile("./db/db.json", result);
          res.json(`Note ${param} has been deleted 🗑`);
      });

})

module.exports = notes;