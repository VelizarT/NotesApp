const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
}

var saveNote = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    }
    var duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0) {
    notes.push(note);
    saveNote(notes);
    return note;
    }
};

var getAll = () => {
    var notes = fetchNotes();
    return notes;
};

var readNote = (title) => {
    var notes = fetchNotes();
    var noteToRead = notes.filter((note) => note.title === title);
    return noteToRead[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var notesNotRemoved = notes.filter((note) => note.title !== title);
    saveNote(notesNotRemoved);
    return notes.length !== notesNotRemoved.length;
};

var printNote = (note) => {
    console.log('---');    
    console.log(`Title: ${note.title}\nBody: ${note.body}`);  
};

module.exports = {
    addNote, //Same as addNote:addNote (es6)
    getAll,
    readNote,
    removeNote,
    printNote
}