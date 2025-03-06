import { useState } from "react"; 
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../images/logo_m.png";
import './css/style.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white text-white py-1 px-6 fixed top-0 left-0 w-full border-b border-[#DBFAFE] z-50 my-10">
      <div className="container mx-auto flex items-center justify-between">
       
        <div className="flex items-center w-30" >
          <img src={Logo} alt="Logo" className="" />
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-black">
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

      
        <nav
          className={`absolute md:static bg-gray-800 md:bg-transparent top-16 left-0 w-full md:w-auto md:flex transition-all ${
            menuOpen ? "block" : "hidden"
          } md:block`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-0">
            <li><a href="/" className="hover:text-gray-400 no-underline"  style={{textDecoration:'none', color:'#78E2FE'}}>Home</a></li>
            <li><a href="#" className="hover:text-gray-400 no-underline"  style={{textDecoration:'none', color:'#78E2FE'}}>About</a></li>
            <li><a href="#" className="hover:text-gray-400 no-underline"  style={{textDecoration:'none', color:'#78E2FE'}}>Services</a></li>
            <li><a href="#" className="hover:text-gray-400 no-underline"  style={{textDecoration:'none', color:'#78E2FE'}}>Contact</a></li>
          </ul>
        </nav>

    
        <div className="hidden md:block">
          <a href="/sign-in" className="bg-[#3F96DE] hover:bg-[#B8F0F9] text-white py-2 px-4 rounded-full transition no-underline" style={{textDecoration:'none'}}>
            Login
          </a>
        </div>
      </div>

      {menuOpen && (
        <div className="mt-4 md:hidden text-center">
          <a href="/sign-in" className="bg-[#DBFAFE] hover:bg-[#B8F0F9] text-black py-2 px-4 rounded-full transition no-underline">
            Login
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;



