import { NavLink } from "react-router-dom";
import logo from '../../assets/logo.svg';

const Footer = () => {
  return (
    <footer className=" bg-header flex items-center justify-center">
     <NavLink className="flex flex-col items-center mt-20 mb-72" to="/" end>
        <img src={logo} alt="logo" className='w-46 h-46'/>
        <span className='text-xxs'>Dim Tvaryn</span>
      </NavLink>
    </footer>);
};
export default Footer;
