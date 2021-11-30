import noteContext from '../context/notes/noteContext';
import { React , useContext, useState} from 'react';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setnote] = useState({title:"", description:"", tag:""})
    
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({title:"", description:"", tag:""});
        props.showAlert("Note Added", "success");
    }
    
    const onChange = (e)=>{
        setnote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div className="container my-3">
            <h3>Add A Note</h3>
            <form className="my-2">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" minLength={3} required value={note.title} id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" minLength={3} required value={note.description} id="description" name="description" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" minLength={3} required value={note.tag} id="tag" name="tag" onChange={onChange}/>
                </div>
                <button type="submit" disabled={note.title.length < 3 || note.description.length < 3} className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote