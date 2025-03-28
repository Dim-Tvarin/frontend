const Error = () => {
  return (
    <div className="h-[calc(100vh-253px)] flex flex-col justify-center items-center bg-[url(../../public/assets/404@2x.jpg)] bg-cover bg-center ">
      <h1 className="text-white text-[150px] mb-12">Ой!</h1>
      <h2 className="text-black text-[40px]">Щось пішло не так...</h2>
      <p className="text-black text-[32px]">
        Спробуйте перезавантажити сторінку
      </p>
    </div>
  );
};
export default Error;
