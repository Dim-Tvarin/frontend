import BlogCard from 'components/BlogCard';

const BlogMain = () => {
  return (
    <div className="container">
      <div className="gap-4 grid grid-cols-3">
        <BlogCard
          title="Знайдіть свого ідеального компаньйона: Поради щодо вибору тварини"
          image="/blog/blog-1.jpg"
          link="/blog/1"
        />
      </div>
    </div>
  );
};

export default BlogMain;
