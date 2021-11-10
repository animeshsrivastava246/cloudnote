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
        }
      ]
    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;