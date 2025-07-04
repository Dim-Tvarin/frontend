import { Link } from 'react-router-dom';

const BlogCard = ({
  image,
  title,
  link,
}: {
  image: string;
  title: string;
  link: string;
}) => {
  return (
    <div className="z-10 flex flex-col text-left">
      <Link to={link} className="block mb-4">
        <img
          src={image}
          alt={title}
          className="mb-16 rounded-4xl w-full h-[280px] object-cover"
        />
      </Link>
      <h3 className="font-medium text-base dark:text-default-btn">{title}</h3>
      <Link to={link} className="text-link text-sm underline">
        Читати більше
      </Link>
    </div>
  );
};

export default BlogCard;
