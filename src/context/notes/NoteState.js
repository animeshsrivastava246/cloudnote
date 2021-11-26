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
    const note = await response.json();
    setNotes(notes.concat(note));
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
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note)=>{return note._id !== id})
    setNotes(newNotes)
  }
  //Editing a Note
  const editNote = async (id, title, description, tag)=>{
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NWE2YWVkOWIxNWZiMjQxOTI0MDA5In0sImlhdCI6MTYzMzAwMzM5Nn0.LxFNDrj0fiCcPLPI2Cre65GLxIkxUgAo4gsGuLyuN9M'
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if(element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  
  return (
      <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
          {props.children}
      </NoteContext.Provider>
  )
}

export default NoteState;