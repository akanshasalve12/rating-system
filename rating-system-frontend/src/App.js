import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import DashboardUser from './pages/UserDashboard';
import DashboardAdmin from './pages/AdminDashboard';
import AddUserPage from './pages/AddUserPage';
import DashboardOwner from './pages/OwnerDashboard';
import StoreList from './pages/StoreList';


<Router>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    {/* User Routes */}
    <Route path="/user/dashboard" element={<DashboardUser />} />
    <Route path="/user/stores" element={<StoreList />} />
    
    {/* Admin Routes */}
    <Route path="/admin/dashboard" element={<DashboardAdmin />} />
    <Route path="/admin/add-user" element={<AddUserPage />} />

    {/* Owner Routes */}
    <Route path="/owner/dashboard" element={<DashboardOwner />} />
  </Routes>
</Router>

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
