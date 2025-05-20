import { CustomButton } from 'components/CustomButton';
import RegistrationForm from 'components/RegistrationForm';
import ResponsiveImage from 'components/ResponsiveImage';
import dogWithRaisedPawMin from '../../assets/dog-with-raised-paw.png';
import dogWithRaisedPawMax from '../../assets/dog-with-raised-paw@2x.png';
import { openDialog } from 'src/redux/dialogs/dialogSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'src/redux/store';

const Registration = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="container relative h-full">
      <div className="absolute top-[13px] right-[80px] w-[771px] h-[1078px] bg-[url('./src/assets/backgrounds/bg-paws-register.png')] bg-contain bg-no-repeat " />
      <div className="grid grid-cols-2 gap-20 leading-[140%] tracking-[0.01em] pt-100 relative text-default-btn">
        <div>
          <h2 className="text-[32px] mb-32">Ласкаво просимо</h2>
          <p className="text-2xl text-left mb-50">
            Щоб мати можливість швидко написати оголошення, або зберегти анкети
            тваринок, які вам сподобалися, увійдіть
          </p>
          <CustomButton
            styleType="defaultButton"
            className="mb-50 mt-0"
            onClick={() => dispatch(openDialog('login'))}
          >
            Зайти в особистий кабінет
          </CustomButton>

          <div className="relative w-[630px] h-[571px] bg-orange rounded-[30px]">
            <div className="absolute bottom-0 left-0 w-[598px] h-[539px] bg-main-pink-l rounded-[20px] overflow-hidden">
              <ResponsiveImage
                urlMax={dogWithRaisedPawMax}
                urlMin={dogWithRaisedPawMin}
                alt="собака з піднятою лапою"
              />
            </div>
          </div>
        </div>

        <RegistrationForm />
      </div>
    </div>
  );
};

export default Registration;
