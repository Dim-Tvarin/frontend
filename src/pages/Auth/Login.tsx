import { CustomButton } from 'components/CustomButton';
import LoginForm from 'components/LoginForm';
import { NavLink } from 'react-router-dom';

const Login = () => {
  return (
    <div className="grid grid-cols-2 gap-[20px] items-center p-[80px]">
      <div className="relative w-[630px] h-[431px] bg-main-pink-d rounded-[30px]">
        <div className="absolute bottom-0 left-0 w-[580px] h-[381px] bg-main-pink-l rounded-[20px] py-[40px] px-[48px] text-black">
          <h2 className="text-[32px] leading-[140%] mb-[17px]">
            Ласкаво просимо
          </h2>
          <p className="text-[24px] text-left leading-[140%] tracking-[0.01em] mb-[21px]">
            Щоб мати можливість швидко написати оголошення, або зберегти анкети
            тваринок, які вам сподобалися, зареєструйтеся
          </p>
          <NavLink to="/register" end>
            <CustomButton
              styleType="defaultButton"
              className="mb-[20px] mt-[0px]"
            >
              Зареєструватися
            </CustomButton>
          </NavLink>
        </div>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
