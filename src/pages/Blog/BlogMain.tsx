import BlogCard from 'components/BlogCard';
import { CustomButton } from 'components/CustomButton';
import { useNavigate } from 'react-router';
import tracks4 from '../../assets/tracks4.png';

const BlogMain = () => {
  const navigate = useNavigate();
  return (
    <div className="relative container">
      <div className="gap-x-20 gap-y-32 grid grid-cols-3 mt-100 mb-50">
        <BlogCard
          title="Знайдіть свого ідеального компаньйона: Поради щодо вибору тварини"
          image="/blog/blog-1.jpg"
          link="/blog/1"
        />
        <BlogCard
          title="Адаптація до нового дому"
          image="/blog/blog-2.jpg"
          link="/blog/1"
        />
        <BlogCard
          title="Особливості здоров'я"
          image="/blog/blog-3.jpg"
          link="/blog/1"
        />
        <BlogCard
          title="Створення щасливого та здорового середовища для вашого нового улюбленця"
          image="/blog/blog-4.jpg"
          link="/blog/1"
        />
        <BlogCard
          title="ТЕСТ: Знайди звіра, який впишеться в твій лайфстайл!"
          image="/blog/blog-5.jpg"
          link="/blog/1"
        />
        <BlogCard
          title="Сила лап і сердець: як тварини змінюють життя людей"
          image="/blog/blog-6.jpg"
          link="/blog/1"
        />
      </div>
      <CustomButton
        className="z-10 bg-default-btn mb-100 rounded-[20px] w-[332px] h-[44px]"
        onClick={() => navigate('/')}
      >
        Повернутися на головну сторінку
      </CustomButton>
      <div className="right-100 -bottom-[118px] z-1 z-1 absolute rotate-[32deg]">
        <img src={tracks4} className="w-[270px] h-[515px]" alt="track" />
      </div>
    </div>
  );
};

export default BlogMain;
