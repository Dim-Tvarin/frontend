import BlogCard from 'components/BlogCard';
import { CustomButton } from 'components/CustomButton';
import { useNavigate } from 'react-router';
import bgPawsBlog from '../../assets/bg-paws-blog.png';
import bgPawsBlogDark from '../../assets/bg-paws-blog-dark.png';
import { useSelector } from 'react-redux';
import { selectUserTheme } from 'src/redux/users/usersSlice';

const BlogMain = () => {
  const navigate = useNavigate();
  const theme = useSelector(selectUserTheme);
  return (
    <div className="relative container overflow-hidden">
      <div className="gap-x-20 gap-y-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-100 mb-50">
        <BlogCard
          title="Знайдіть свого ідеального компаньйона: Поради щодо вибору тварини"
          image="/blog/blog-1.jpg"
          link="/blog/porady-shchodo-vyboru-tvaryny"
        />
        <BlogCard
          title="Адаптація до нового дому"
          image="/blog/blog-2.jpg"
          link="/blog/adaptatsiya-do-novoho-domu"
        />
        <BlogCard
          title="Особливості здоров'я"
          image="/blog/blog-3.jpg"
          link="/blog/osoblyvosti-zdorovya"
        />
        <BlogCard
          title="Створення щасливого та здорового середовища для вашого нового улюбленця"
          image="/blog/blog-4.jpg"
          link="/blog/stvoryennya-zdorovoho-seredovyshcha-dlya-uliublentsya"
        />
        <BlogCard
          title="ТЕСТ: Знайди звіра, який впишеться в твій лайфстайл!"
          image="/blog/blog-5.jpg"
          link="/blog/test-znajdy-zvira"
        />
        <BlogCard
          title="Сила лап і сердець: як тварини змінюють життя людей"
          image="/blog/blog-6.jpg"
          link="/blog/yak-tvaryny-zminyuyut-zhyttya"
        />
      </div>
      <CustomButton
        styleType="defaultButton"
        className="z-10 bg-default-btn mb-100 rounded-[20px] w-[332px] h-[44px] text-base"
        onClick={() => navigate('/')}
      >
        Повернутися на головну сторінку
      </CustomButton>
      <div className="hidden lg:block right-100 -bottom-[70px] z-1 absolute ">
        <img
          src={theme === 'light' ? bgPawsBlog : bgPawsBlogDark}
          className="w-[490px] h-[513px]"
          alt="track"
        />
      </div>
    </div>
  );
};

export default BlogMain;
