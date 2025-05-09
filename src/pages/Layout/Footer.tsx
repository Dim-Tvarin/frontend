import { NavLink } from 'react-router-dom';
import logo from '../../assets/color-logo.svg';
import { Link } from 'react-router-dom';
import { LiaFacebook } from 'react-icons/lia';
import insta from '../../../public/assets/instagram.svg';

const Footer = () => {
  return (
    <footer className="relative flex lg:justify-center items-center bg-header px-16 py-5 lg:py-16">
      <NavLink className="flex flex-col items-center" to="/" end>
        <img src={logo} alt="logo" className="w-46 h-46" />
        <span className="text-xxs">Dim Tvaryn</span>
      </NavLink>
      <div className="right-1/8 absolute flex gap-[20px]">
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
