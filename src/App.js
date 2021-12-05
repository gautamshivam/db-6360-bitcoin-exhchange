import './App.css';
import Home from './Home';
import Dashboard_client from './Dashboard_client';
import {Route, Routes} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import TraderReport from './components/trader/TraderReport';
import AllClients from './components/trader/AllClients';
import ClientReport from './components/client/ClientReport';
import DashboardManager from './components/manager/DashboardManager';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/client-report" element={<ClientReport/>}/>
        <Route exact path="/trader-report" element={<TraderReport/>}/>
        <Route exact path="/all-clients" element={<AllClients/>}/>
        <Route exact path="/dashboard_client" element={<Dashboard_client/>}/>
        <Route exact path="/dashboardmanager" element={<DashboardManager/>}/>
      </Routes>
    </div>
  );
}

export default App;
