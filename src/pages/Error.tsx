import bg from '../../public/assets/404@2x.jpg';

const Error = () => {
  return (
    <div className=" relative h-[calc(100vh-253px)] flex flex-col justify-center items-center">
      <div className="absolute z-1  right-0 top-0 left-0 bottom-0">
        <img src={bg} alt="граюча собака" className="w-full h-full" />
      </div>
      <div className="z-10">
        <h1 className="text-white text-[150px] mb-12">Ой!</h1>
        <h2 className="text-black text-[40px]">Щось пішло не так...</h2>
        <p className="text-black text-[32px]">
          Спробуйте перезавантажити сторінку
        </p>
      </div>
    </div>
  );
};
export default Error;
