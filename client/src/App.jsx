import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomeTwoBanner from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Appointment from './components/Appointment';
import Emergency from './components/Emergency'
import Footer from './components/Fotter';
import Navbar  from './components/Navbar';
import Dashboard from './components/Dashboard';
import Liveupdate from './components/Liveupdate';
import { useState } from 'react';
export const AppState = createContext();

const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // Function to handle logout
  const handleLogout = () => {
    // Remove token and user-related data from localStorage
    localStorage.removeItem("token");

    localStorage.removeItem("userid");

    // Reset user state
    setUser(null);

    // Navigate to login page
    navigate("/login");
  };

  // Function to check if user is logged in
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/checkUser", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (err) {
      console.log(err.response);
      navigate("/login");
    }
  }
  useEffect(() => {
    if (token) {
      console.log("Token exists, calling checkUser...");

      checkUser();
    }
  }, [token]);


function App() {
  return (
    <AppState.Provider value={{ user, setUser, handleLogout }}>

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
    </AppState.Provider>

  );
}

export default App;
