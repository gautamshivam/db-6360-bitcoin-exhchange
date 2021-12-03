import './App.css';
import Home from './Home';
import Dashboard_client from './Dashboard_client';
import Dashboard_trader from './Dashboard_trader';
import { Route,BrowserRouter,Switch } from "react-router-dom";
import react,{useState} from 'react';
import Client_Profile from './Client_Profile';
import Trader_Profile from './Trader_Profile';
import Transaction from './Transaction';
import Deposit from './Deposit';
import Navbar from './Navbar';
import { UserContext } from './UserContext';

function App() {
  const[user,setUser]=useState(null)
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      <UserContext.Provider value={{user,setUser}}>
      <Route exact path={"/"} component={Home}/>
      <Route exact path={"/Dashboard_client"} component={Dashboard_client}/>
      <Route exact path={"/Dashboard_trader"} component={Dashboard_trader}/>
      <Route exact path={"/Client_Profile"} component={Client_Profile}/>
      <Route exact path={"/Trader_Profile"} component={Trader_Profile}/>
      <Route exact path={"/Transaction"} component={Transaction}/>
      <Route exact path={"/Deposit"} component={Deposit}/>
      </UserContext.Provider>
      </Switch>
      </BrowserRouter>
      </div>
  );
}

export default App;
