import './App.css';
import Home from './Home';
import Dashboard_client from './Dashboard_client';
import {Route, Routes} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/dashboard_client" element={<Dashboard_client/>}/>
      </Routes>
    </div>
  );
}

export default App;
