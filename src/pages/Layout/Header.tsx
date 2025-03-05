import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { FaRegHeart } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { CustomButton } from 'components/CustomButton';


export const Header = () => {
  return (
    <header className='h-100 bg-main-pink-l flex items-center container'>
        <nav className='w-full'>
          <ul className='flex flex-row items-center'>
            <li className='mr-auto'>
              <NavLink to="/" end>
                <img src={logo} alt="logo" />
              </NavLink>
            </li>
            <li className='mr-80'>
              <NavLink to="/find" end>
                Знайти тваринку
              </NavLink>
            </li>
            <li className='mr-80'>
              <NavLink to="/giveaway" end>
                Віддати тваринку
              </NavLink>
            </li>
            <li className='mr-80'>
              <NavLink to="/lookfor" end>
                Доглянути за тваринкою
              </NavLink>
          </li>
          
           <li  className='ml-auto mr-20'>
              <NavLink to="/favorite" end>
              <IoIosSearch size="26px"/>
              </NavLink>
            </li>
            <li  className='mr-20'>
              <NavLink to="/favorite" end>
              <FaRegHeart size="20px"/>
              </NavLink>
            </li>
            <li>
            <NavLink to="/register" end>
              <CustomButton
                type="button"
                className="w-100 m-auto"
              >
                Увійти
              </CustomButton>
              </NavLink>
            </li>
          </ul>
        </nav>
    </header>
  )
}
