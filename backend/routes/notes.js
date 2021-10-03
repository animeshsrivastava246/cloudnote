const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All Notes using: POST "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser , async (req, res)=>{
    try {    
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        // catch errors
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

// ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser , [
    body("title", "Enter Valid Title").isLength({ min: 3 }),
    body("description", "Description Too Short, minimum of 4 characters").isLength({min: 4}),],
    async (req, res)=>{
        try {
            const {title, description, tag} = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {// If errors -> return Bad Request and errors
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote);
            
        } catch (error) {
            // catch errors
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    })
    
    // ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote". Login required
    router.put('/updatenote/:id', fetchuser, async(req, res)=>{
        try{
            const {title, description, tag} = req.body;
            // Create newNote object
            const newNote = {};
            if(title){newNote.title = title};
            if(description){newNote.description = description};
            if(tag){newNote.tag = tag};

            // Find the note to be updated
            let note = await Note.findById(req.params.id);//const note = Note.findByIdAndUpdate(); don't use coz of security purpose
            if(!note){return res.status(404).send("Not Found")}
            if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}

            note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
            res.json({note});
        } catch (error) {
            // catch errors
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    })
    
    // ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
    router.delete('/deletenote/:id', fetchuser, async(req, res)=>{
        try{
            // Find the note to be deleted
            let note = await Note.findById(req.params.id);//const note = Note.findByIdAndUpdate(); don't use coz of security purpose
            if(!note){return res.status(404).send("Not Found")}

            // Allow deletion
            if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}

            note = await Note.findByIdAndDelete(req.params.id)
            res.json({"Success": "Note Is Deleted", note: note});
        } catch (error) {
            // catch errors
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    })
    
    module.exports = router