import bg from '../../public/assets/404@2x.jpg';

const Error = () => {
  return (
    <div className="relative flex flex-col justify-center items-center h-[calc(100vh-158px)] lg:h-[calc(100vh-202px)]">
      <div className="top-0 right-0 bottom-0 left-0 z-1 absolute">
        <img src={bg} alt="граюча собака" className="w-full h-full" />
      </div>
      <div className="z-10 flex flex-col gap-20">
        <h1 className="lg:mb-12 text-[150px] text-white text-8xl">Ой!</h1>
        <h2 className="text-black lg:text-[40px] text-3xl">
          Щось пішло не так...
        </h2>
        <p className="text-black lg:text-[32px] text-xl">
          Спробуйте перезавантажити сторінку
        </p>
      </div>
    </div>
  );
};
export default Error;
