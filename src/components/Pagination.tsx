import { Button } from "./components/ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";


const Pagination = (
  { currentPage = 1, totalPages = 2, onPageChange, className='' }:
  { currentPage?: number; totalPages?: number; onPageChange: (page: number)=> void; className?: string;}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`${className} flex gap-24 items-center justify-center font-[Inter] font-semibold`}>
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-50 h-50 rounded-full border-2 border-default-btn"
      >
        <FaArrowLeft size={22}/>
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant="outline"
          size="icon"
          onClick={() => onPageChange(page)}
          className={`rounded-full border-2 border-default-btn w-50 h-50 font-medium transition-colors text-base
            ${
              currentPage === page
                ? "bg-orange text-white"
                : "bg-white text-default-btn hover:bg-gray/90"
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
        onClick={() => onPageChange(currentPage + 1)}
        className="w-50 h-50 rounded-full border-2 border-default-btn"
      >
        <FaArrowRight size={22}/>
      </Button>
    </div>
  );
};

export default Pagination;
