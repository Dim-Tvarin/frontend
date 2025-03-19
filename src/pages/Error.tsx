const Error = () => {
  return (
    <div className='h-[calc(100vh-259px)] flex flex-col justify-center items-center bg-[url(src/assets/404@2x.jpg)] bg-cover bg-center '>
      <h1 className='text-white text-3xl mb-12'>Ой!</h1>
      <h2 className='text-black text-40'>Щось пішло не так...</h2>
      <p className='text-black text-xl'>Спробуйте перезавантажити сторінку</p>
    </div>
  );
};
export default Error;
