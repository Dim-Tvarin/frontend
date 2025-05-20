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
      <div className="grid leading-[140%] tracking-[0.01em] text-default-btn relative items-center text-center xs:grid-cols-1 xs:gap-32 xs:pt-40 xs:pb-80 lg:grid-cols-2 lg:gap-20 lg:pt-100 lg:pb-0">
        <div className="flex xs:flex-col-reverse lg:flex-col">
          <div>
            <h2 className="xs:text-[18px] xs:mb-10 xs:mt-16 lg:text-[32px] lg:mb-32 lg:mt-0">
              Ласкаво просимо
            </h2>
            <p className="xs:mb-20 xs:text-center xs:text-[16px] lg:mb-50 lg:text-left lg:text-2xl">
              Щоб мати можливість швидко написати оголошення, або зберегти
              анкети тваринок, які вам сподобалися, увійдіть
            </p>
            <CustomButton
              styleType="defaultButton"
              className="mt-0 text-[16px] xs:mb-0 lg:mb-50"
              onClick={() => dispatch(openDialog('login'))}
            >
              Вхід в особистий кабінет
            </CustomButton>
          </div>

          <div className="relative bg-orange rounded-[30px] m-auto xs:w-full xs:h-[210px] lg:w-[630px] lg:h-[571px]">
            <div className="absolute bottom-0 left-0 bg-main-pink-l rounded-[20px] overflow-hidden xs:w-full xs:h-[194px] lg:w-[598px] lg:h-[539px]">
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
