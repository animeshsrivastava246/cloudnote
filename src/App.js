import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
            <Route exact path="/"> <Home/> </Route>
            <Route exact path="/about"> <About/> </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
