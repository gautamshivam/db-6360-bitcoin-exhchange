import './App.css';
import Home from './Home';
import Dashboard_client from './Dashboard_client';
import { Route,Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route exact path="/dashboard_client" component={Dashboard_client}/>
    </div>
  );
}

export default App;
