import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import { Alert } from './components/Alert';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert message="My name is The Devil"/>
          <div className="container">
          <Switch>
              <Route exact path="/"> <Home/> </Route>
              <Route exact path="/about"> <About/> </Route>
          </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
