import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { FaRegHeart } from "react-icons/fa";
import { GoPerson } from "react-icons/go";


export const Header = () => {
  return (
    <header className='h-[100px] bg-[#f7ebeb] flex items-center container'>
        <nav className='w-full'>
          <ul className='flex flex-row items-center'>
            <li className='mr-auto'>
              <NavLink to="/" end>
                <img src={logo} alt="logo" />
              </NavLink>
            </li>
            <li className='mr-[80px]'>
              <NavLink to="/find" end>
                Знайти тваринку
              </NavLink>
            </li>
            <li className='mr-[80px]'>
              <NavLink to="/giveaway" end>
                Віддати тваринку
              </NavLink>
            </li>
            <li className='mr-[80px]'>
              <NavLink to="/lookfor" end>
                Доглянути за тваринкою
              </NavLink>
            </li>
            <li  className='ml-auto mr-[20px]'>
              <NavLink to="/favorite" end>
              <FaRegHeart size="20px"/>
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" end>
                <GoPerson  size="26px"/>
              </NavLink>
            </li>
          </ul>
        </nav>
    </header>
  )
}
