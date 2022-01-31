const notes = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend } = require("../helpers/fsUtils")

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
})

module.exports = notes;