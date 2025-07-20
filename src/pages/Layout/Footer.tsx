import { NavLink } from 'react-router-dom';
import logo from '../../assets/color-logo.svg';
import { TiSocialLinkedinCircular } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { LuClipboardList } from 'react-icons/lu';
import { CustomButton } from 'components/CustomButton';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { clearError } from 'src/redux/users/usersSlice';
import { openDialog } from 'src/redux/dialogs/dialogSlice';

const Footer = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <footer className="flex justify-center items-center bg-header px-16 py-5 lg:py-16">
      <div className="flex gap-[20px] items-center mr-50 sm:mr-[84px]">
        <Link
          to="https://www.linkedin.com/company/dim-tvaryn/posts/?feedView=all"
          target="_blank"
          className="mr-auto"
        >
          <TiSocialLinkedinCircular
            size={32}
            className="dark:text-default-btn dark:hover:text-white"
          />
        </Link>
      </div>
      <NavLink className="flex flex-col items-center gap-2" to="/" end>
        <img src={logo} alt="logo" className="w-40 sm:w-46 h-40 sm:h-46" />
        <span className="text-sm dark:text-default-btn dark:hover:text-white">
          Dim Tvaryn
        </span>
      </NavLink>
      <CustomButton
        styleType="linkButton"
        className="text-black w-[26px] sm:w-[165px] text-sm ml-auto sm:ml-80 focus:outline-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 dark:text-default-btn hover:text-link dark:hover:text-white"
        onClick={() => {
          dispatch(clearError());
          dispatch(openDialog('feedback'));
        }}
      >
        <LuClipboardList size={26} />
        <span className="hidden sm:inline ">Зворотній звʼязок</span>
      </CustomButton>
    </footer>
  );
};
export default Footer;
