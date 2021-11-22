import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
  const host = 'http://localhost:5000'
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
    
  //Get all Notes
  const getNotes = async ()=>{
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NWE2YWVkOWIxNWZiMjQxOTI0MDA5In0sImlhdCI6MTYzMzAwMzM5Nn0.LxFNDrj0fiCcPLPI2Cre65GLxIkxUgAo4gsGuLyuN9M'
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }
  //Adding a Note
  const addNote = async (title, description, tag)=>{
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NWE2YWVkOWIxNWZiMjQxOTI0MDA5In0sImlhdCI6MTYzMzAwMzM5Nn0.LxFNDrj0fiCcPLPI2Cre65GLxIkxUgAo4gsGuLyuN9M'
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });
    console.log("Adding the note:" + response.json());
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
  const deleteNote = async (id)=>{
    //Make API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NWE2YWVkOWIxNWZiMjQxOTI0MDA5In0sImlhdCI6MTYzMzAwMzM5Nn0.LxFNDrj0fiCcPLPI2Cre65GLxIkxUgAo4gsGuLyuN9M'
      }
    });
    console.log(response.json());
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note)=>{return note._id !== id})
    setNotes(newNotes)
  }
  //Editing a Note
  const editNote = async (id, title, description, tag)=>{
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NWE2YWVkOWIxNWZiMjQxOTI0MDA5In0sImlhdCI6MTYzMzAwMzM5Nn0.LxFNDrj0fiCcPLPI2Cre65GLxIkxUgAo4gsGuLyuN9M'
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });
    console.log(response.json());
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }
  
  return (
      <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
          {props.children}
      </NoteContext.Provider>
  )
}

export default NoteState;