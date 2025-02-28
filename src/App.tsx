import { NavLink } from "react-router-dom";
import "./App.css";

function App() {

  return (
    <>
      <h1>Pets Marketplace</h1>
       <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/register" end>
        Sign Up
        </NavLink>
        
    </nav>
    </>
  );
}

export default App;
