import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
