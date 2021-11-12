import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{

    const notesInitial = [
        {
          "_id": "6156dfbf152e64d6045c935d",
          "user": "6155a6aed9b15fb241924009",
          "title": "My Notes1",
          "description": "Eat Study Code Sleep REPEAT 1",
          "tag": "General",
          "date": "2021-10-01T10:15:27.271Z",
          "__v": 0
        },
        {
          "_id": "6156dfbf152e64d60245c935d",
          "user": "6155a6aed9b15fb241924009",
          "title": "My Notes1",
          "description": "Eat Study Code Sleep REPEAT 1",
          "tag": "General",
          "date": "2021-10-01T10:15:27.271Z",
          "__v": 0
        },
        {
          "_id": "6156dfbf152e64d60435c935d",
          "user": "6155a6aed9b15fb241924009",
          "title": "My Notes1",
          "description": "Eat Study Code Sleep REPEAT 1",
          "tag": "General",
          "date": "2021-10-01T10:15:27.271Z",
          "__v": 0
        },
        {
          "_id": "6156dfbf152e64d60445c935d",
          "user": "6155a6aed9b15fb241924009",
          "title": "My Notes1",
          "description": "Eat Study Code Sleep REPEAT 1",
          "tag": "General",
          "date": "2021-10-01T10:15:27.271Z",
          "__v": 0
        },
        {
          "_id": "6156dfbf152e64d60455cf935d",
          "user": "6155a6aed9b15fb241924009",
          "title": "My Notes1",
          "description": "Eat Study Code Sleep REPEAT 1",
          "tag": "General",
          "date": "2021-10-01T10:15:27.271Z",
          "__v": 0
        }
      ]
    const [notes, setNotes] = useState(notesInitial)

    //Adding a Note
    const addNote = (title, description, tag)=>{
      //Make API call
      console.log("Adding the note");
      const note = {
        "_id": "6156dfbf152e64d60455cf935d",
        "user": "6155a6aed9b15fb241924009",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2021-10-01T10:15:27.271Z",
        "__v": 0
      };
      setNotes(notes.concat(note))
    }
    //Deleting a Note
    const deleteNote = (id)=>{
      //Make API call
      console.log("Deleting the note with id" + id);
      const newNotes = notes.filter((note)=>{return note._id !== id})
      setNotes(newNotes)
    }
    //Editing a Note
    const editNote = (id, title, description, tag)=>{

    }
    
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;