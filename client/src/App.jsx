import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeTwoBanner from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Appointment from './components/Appointment';
import Emergency from './components/Emergency'
import Footer from './components/Fotter';
import Navbar  from './components/Navbar';
import Dashboard from './components/Dashboard';
import Liveupdate from './components/Liveupdate';





function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeTwoBanner />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/liveupdate" element={<Liveupdate />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
