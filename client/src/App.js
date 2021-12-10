import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchYoutube from "./components/Home/SearchYoutube/SearchYoutube";
import GoogleMap from "./components/Home/GoogleMap/GoogleMap";
import Blog from "./components/Home/Blog/Blog"
import Student from "./components/Home/Student/Student";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthRoute from "./components/HOC/AuthRoute";
import { StudentAPI } from "./components/Home/Student/StudentAPI";
import DetailBlog from "./components/Home/Blog/DetailBlog";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/search-youtube" component={SearchYoutube} />
        <AuthRoute exact path="/google-map" component={GoogleMap} />
        <AuthRoute exact path="/blog" component={Blog} />
        <AuthRoute exact path="/blog/:id" component={DetailBlog} />
        <AuthRoute exact path="/student" component={Student} />
        <AuthRoute exact path="/studentAPI" component={StudentAPI} />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
