import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import hart from '../../assets/hart.svg'
import cabinet from '../../assets/cabinet.svg'

export const Header = () => {
  return (
    <header className='h-[100px] bg-[#f7ebeb] flex items-center container'>
        <nav>
          <ul className='flex flex-row gap-[80px] items-center'>
          <li>
            <NavLink to="/" end>
              <img src={logo} alt="logo" />
            </NavLink></li>
          <li>
            <NavLink to="/find" end>
              Знайти тваринку
            </NavLink></li>
          <li>
            <NavLink to="/giveaway" end>
              Віддати тваринку
            </NavLink></li>
          <li>
            <NavLink to="/lookfor" end>
              Доглянути за тваринкою
            </NavLink></li>
          <li>
            <NavLink to="/favorite" end>
              <img src={hart} alt="favorite pets" />
            </NavLink></li>
          <li>
            <NavLink to="/register" end>
               <img src={cabinet} alt="personal cabinet" />
            </NavLink></li>
          </ul>
        </nav>
    </header>
  )
}
