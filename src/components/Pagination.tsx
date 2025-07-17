import { Button } from './components/ui/button';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa6';
import { useSearchParams } from 'react-router';
import { cn } from './lib/utils';

const Pagination = ({
  currentPage = 1,
  totalPages = 2,
  onPageChange,
  className = '',
}: {
  currentPage?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  className?: string;
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const [searchParams, setSearchParams] = useSearchParams();

  const curPage = Number(searchParams.get('page')) || currentPage;
  const handleNext = () => {
    onPageChange(curPage + 1);
    setSearchParams({ page: String(curPage + 1) });
  };
  const handlePrev = () => {
    onPageChange(curPage - 1);
    setSearchParams({ page: String(curPage - 1) });
  };

  return (
    <div
      className={`${className} flex gap-[18px] lg:gap-[34px] items-center justify-center font-[Inter] font-semibold`}
    >
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={handlePrev}
        className="border-2 border-default-btn dark:border-btn-orange rounded-full w-32 lg:w-50 h-32 lg:h-50"
      >
        <FaArrowLeft
          size={22}
          className={cn('text-default-btn dark:text-orange', {
            'text-disabled dark:text-default-btn': currentPage === 1,
          })}
        />
      </Button>

      {pages.map(page => (
        <Button
          key={page}
          variant="outline"
          size="icon"
          onClick={() => {
            onPageChange(page);
            setSearchParams({ page: `${page}` });
          }}
          className={`rounded-full border-2 border-default-btn dark:border-btn-orange w-32 h-32 lg:w-50 lg:h-50 font-medium transition-colors text-base
            ${
              currentPage === page
                ? 'bg-orange text-white dark:text-header'
                : 'bg-white dark:bg-transparent text-default-btn dark:text-btn-orange'
            }
          `}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className={`border-2 border-default-btn dark:border-btn-orange rounded-full w-32 lg:w-50 h-32 lg:h-50 ${
          currentPage === totalPages
            ? 'bg-transparent text-default-btn dark:text-default-btn'
            : 'bg-white dark:bg-transparent text-default-btn dark:text-orange'
        }
          `}
      >
        <FaArrowRight size={22} />
      </Button>
    </div>
  );
};

export default Pagination;
