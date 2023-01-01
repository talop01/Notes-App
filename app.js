// const command = process.argv[2]
// if (command === "add"){
//     console.log("Adding note!")
// }
// else if (command === "remove"){
//     console.log("Removeing notes!")
// }
// console.log(process.argv)

const notes = require("./notes.js")
// //Yargs
const yargs = require("yargs")
const { showCompletionScript } = require("yargs")
// yargs.version("1.1.0")

// Add command
yargs.command({
    command:"add",
    describe:"Add a new note",
    builder:{
        title:{
            describe: "Note title",
            demandOption:true,
            type:"string"
        },
        body:{
            describe:"Note body",
            demandOption:true,
            type:"string"
        }
    },
    handler:function (argv){
        notes.addNote(argv.title,argv.body)
        // console.log("Title: " + argv.title)
        // console.log("Body: " + argv.body)
    }
})

// Remove command
yargs.command({
    command:"remove",
    describe:"Remove a note",
    builder:{
        title:{
            describe:"Note title",
            demandOption:true,
            type:"string"
        }
    },
    handler:argv =>{ 
        notes.removeNote(argv.title)
    }
})

// List command
yargs.command({
    command:"list",
    describe:"Listing a note",
    handler(){
        notes.listing()
    }
})

// Read command
yargs.command({
    command:"read",
    describe:"Reading a note",
    builder:{
        title:{
            describe:"Note Title",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
        notes.reading(argv.title)
    }
})

// console.log(yargs.argv)
yargs.parse()