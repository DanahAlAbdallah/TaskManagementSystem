import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import Footer from './components/Footer';
import NavBar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Home1 from './components/Home1';
import NotFound from './components/NotFound';
import Contact from './components/Contact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import AdminDashboad from './components/AdminDashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import UserHome from './components/UserHome';
import Schedule from './components/Schedule';



function App() {
  
   
  
  return (
    <Router>
  <>
    <ToastContainer />
    {window.location.pathname === '/' && <NavBar />} {/* Render NavBar only on the home page */}
    {window.location.pathname === '/signup' && <NavBar />}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<Home1 />} />
      <Route path="/Home" element={<UserHome />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/Admin/Dashboard" element={<AdminDashboad />} />
      <Route path="/tasks" element={<Schedule />} />
      <Route path="/reset_password/:id/:token" element={<ResetPassword />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
    {window.location.pathname === '/' && window.location.pathname === '/signup' && window.location.pathname === '/login' && <Footer />}
    
  </>
</Router>

  );
}

export default App;
