import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { CustomButton } from 'components/CustomButton';
import { FaRegHeart } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { logoutThunk } from '../../redux/users/usersOperations';

export const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const handleClick = () => {
        dispatch(logoutThunk());
    };

    return (
        <header className="h-100 bg-main-pink-l flex items-center container">
            <nav className="w-full">
                <ul className="flex flex-row items-center">
                    <li className="mr-auto">
                        <NavLink to="/" end>
                            <img src={logo} alt="logo" />
                        </NavLink>
                    </li>
                    <li className="mr-80">
                        <NavLink to="/find" end>
                            Знайти тваринку
                        </NavLink>
                    </li>
                    <li className="mr-80">
                        <NavLink to="/giveaway" end>
                            Віддати тваринку
                        </NavLink>
                    </li>
                    <li className="mr-80">
                        <NavLink to="/lookfor" end>
                            Доглянути за тваринкою
                        </NavLink>
                    </li>

                    <li className="ml-auto mr-20">
                        <NavLink to="/favorite" end>
                            <IoIosSearch size="26px" />
                        </NavLink>
                    </li>
                    <li className="mr-20">
                        <NavLink to="/favorite" end>
                            <FaRegHeart size="20px" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" end>
                            <CustomButton
                                type="button"
                                styleType="defaultButton"
                                className="w-100 m-auto"
                            >
                                Увійти
                            </CustomButton>
                        </NavLink>
                    </li>
                    <li>
                        <CustomButton
                            type="button"
                            styleType="redButton"
                            className="w-[100px] m-auto ml-[20px]"
                            onClick={handleClick}
                        >
                            Вийти
                        </CustomButton>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
