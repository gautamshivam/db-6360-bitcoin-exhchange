import './App.css';
import Home from './Home';
import Dashboard_client from './Dashboard_client';
import client_profile from './ClientProfile';
import trader_profile from './TraderProfile';
import client_report from './ClientReport';
import { Route,Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route exact path="/dashboard_client" component={Dashboard_client}/>
      <Route exact path="/client_profile" component={client_profile}/>
      <Route exact path="/client_report" component={client_report}/>
      <Route exact path="/trader_profile" component={trader_profile}/>
    </div>
  );
}

export default App;