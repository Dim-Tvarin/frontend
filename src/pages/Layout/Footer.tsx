import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { LiaFacebook } from 'react-icons/lia';
import insta from '../../../public/assets/instagram.svg';

const Footer = () => {
  return (
    <footer className=" bg-header flex flex-col items-center justify-center gap-[19px] pb-20">
      <NavLink className="flex flex-col items-center mt-20" to="/" end>
        <img src={logo} alt="logo" className="w-46 h-46" />
        <span className="text-xxs">Dim Tvaryn</span>
      </NavLink>
      <div className="flex gap-[20px]">
        <Link to="/">
          <LiaFacebook size={24} />
        </Link>
        <Link to="/">
          <img src={insta} alt="instagram" />
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
