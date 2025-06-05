import { NavLink } from 'react-router-dom';
import logo from '../../assets/color-logo.svg';
import { Link } from 'react-router-dom';
import { LiaFacebook } from 'react-icons/lia';
import { LuClipboardList } from 'react-icons/lu';
import insta from '../../../public/assets/instagram.svg';
import { CustomButton } from 'components/CustomButton';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { clearError } from 'src/redux/users/usersSlice';
import { openDialog } from 'src/redux/dialogs/dialogSlice';

const Footer = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <footer className="relative flex lg:justify-center items-center bg-header px-16 py-5 lg:py-16">
      <div className="right-1/8 absolute flex gap-[20px]">
        <Link to="/">
          <LiaFacebook size={24} />
        </Link>
        <Link to="/">
          <img src={insta} alt="instagram" />
        </Link>
      </div>
      <NavLink className="flex flex-col items-center" to="/" end>
        <img src={logo} alt="logo" className="w-46 h-46" />
        <span className="text-xxs">Dim Tvaryn</span>
      </NavLink>
      <CustomButton
        styleType="linkButton"
        className="text-sm"
        onClick={() => {
          dispatch(clearError());
          dispatch(openDialog('feedback'));
        }}
      >
        <LuClipboardList size={26} />
        Зворотній звʼязок
      </CustomButton>
    </footer>
  );
};
export default Footer;
