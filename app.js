const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

var titelOptions = {
    describe: 'Title of note',
    demand: true, //require the argument
    alias: 't' //changes the syntax in the terminal
};
var bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};
var argv = yargs
.command('add', 'Add a new note', {
    title: titelOptions,
    body: bodyOptions
})
.command('list', 'List all notes')
.command('read', 'Read a note', {
    title: titelOptions
})
.command('remove', 'Remove a note', {
    title: titelOptions
})
.help() //returns useful info when use help flag
.argv;
var command = argv._[0];
var textToAdd = '\n';
for(var i = 3; i < process.argv.length; i++) {
    textToAdd += process.argv[i] + ' ';
}
//console.log('Command: ', command);
//console.log('Process argv:', process.argv);
//console.log('Yargs argv:', argv);

if(command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if(note) {
        console.log('New note added!');      
        notes.printNote(note);
    } else {
        console.log('Note title already in use!');
    }
    // fs.appendFile('newNote.txt', textToAdd, (err) => {
    //     if(err) {
    //         console.log('Oops, something went wrong!');
    //     }
    // });
} else if(command === 'list') {
    var notesAll = notes.getAll();
    console.log(`Listing ${notesAll.length} note(s).`);
    notesAll.forEach((note) => notes.printNote(note));
} else if(command === 'read') {
    var noteToRead = notes.readNote(argv.title);
    if(noteToRead) {
        console.log('Note found!');    
        notes.printNote(noteToRead);
    } else {
        console.log('Note not found!');
    }
} else if(command === 'remove') {
    var isRemoved = notes.removeNote(argv.title);
    var message = isRemoved ? 'Note is removed!' : 'No such note!'; 
    
    console.log(message);

} else {
    console.log('Command not recognised');
}