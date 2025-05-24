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
      <div className="grid leading-[140%] tracking-[0.01em] text-default-btn relative items-center text-center grid-cols-1 gap-32 pt-40 pb-80 2xl:grid-cols-2 2xl:gap-20 2xl:pt-100 2xl:pb-0">
        <div className="flex flex-col-reverse sm:flex-row sm:gap-20 2xl:flex-col 2xl:gap-0">
          <div>
            <h2 className="text-[18px] mb-10 mt-16 2xl:text-[32px] 2xl:mb-32 2xl:mt-0">
              Ласкаво просимо
            </h2>
            <p className="mb-20 text-center text-[16px] 2xl:mb-50 2xl:text-left 2xl:text-2xl">
              Щоб мати можливість швидко написати оголошення, або зберегти
              анкети тваринок, які вам сподобалися, увійдіть
            </p>
            <CustomButton
              styleType="defaultButton"
              className="mt-0 text-[16px] mb-0 2xl:mb-50"
              onClick={() => dispatch(openDialog('login'))}
            >
              Вхід в особистий кабінет
            </CustomButton>
          </div>
          <div className="relative bg-orange rounded-[30px] m-auto w-full h-[210px] 2xl:w-[630px] 2xl:h-[571px]">
            <div className="absolute bottom-0 left-0 bg-main-pink-l rounded-[20px] overflow-hidden w-full h-[194px] md:w-full 2xl:w-[598px] 2xl:h-[539px]">
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
