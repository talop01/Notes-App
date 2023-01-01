const fs = require("fs")
const chalk = require("chalk")

// Read command
const readNote = function(title){
    const notes = loadNotes()
    const matchfound = notes.find((note) => note.title === title)
    if (matchfound){
        console.log(chalk.green.underline.bold(matchfound.title))
        console.log("=>" + matchfound.body)
    }
    else{
        console.log(chalk.red.inverse("Note not found"))
    }
}
// list command
const showLists = function(){
    const notes = loadNotes()
    console.log(chalk.green.bold.underline("Your notes:"))
    notes.forEach(element => {
        console.log("=>" + element.title)
    });
}

// Remove command
const removeNote = function(title){
    const notes = loadNotes()
    const unmatching = notes.filter(note => note.title !== title)

    if(unmatching.length < notes.length){
        saveNotes(unmatching)
        console.log(chalk.bgGreen.bold("Note removed!"))
    }
    else{
        console.log(chalk.bgRed.bold("No Note found!"))
    }
} 

// Add command
const addNote = (title,body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter( note => note.title === title)
    // if (duplicateNotes.length === 0){
    //     notes.push({
    //         title:title,
    //         body:body
    //     })
    //     saveNotes(notes)
    //     console.log(chalk.green.inverse("new note added!"))
    // }
    // else{
    //     console.log(chalk.red.inverse("note title taken!"))
    // }

    const duplicateNote = notes.find((note) => note.title === title)
    if (duplicateNote === undefined){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("new note added!"))
    }
    else{
        console.log(chalk.red.inverse("note title taken!"))
    }
}

const saveNotes = (notes)=> {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync("notes.json",dataJson)
}

// const saveNotes = function (notes){
//     const dataJson = JSON.stringify(notes)
//     fs.writeFileSync("notes.json",dataJson)
// }

// const loadNotes = function (){
//     try {
//         const dataBuffer = fs.readFileSync("./notes.json")
//         const dataJson = dataBuffer.toString()
//         return JSON.parse(dataJson)
//     } catch (e){
//         return []
//     }
// }
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("./notes.json")
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e){
        return []
    }
}

// exporting module
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listing: showLists,
    reading: readNote,
}

console.log(process)