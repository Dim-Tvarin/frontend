import { MdErrorOutline } from "react-icons/md";
import { Textarea } from "./components/ui/textarea"
import { cn } from "./lib/utils";

 
export const TextareaDemo = ({ placeholder, label, id, className, error }:
  { id: string;
    placeholder: string;
    label?: string;
    className?: string;
    error?: string;
    
  }) => {
  return (
    <div className={ cn(className && className , 'w-full')}>
          {label && (
            <label
              htmlFor={id}
              className={cn('font-medium text-input-label', 'text-20' )}
            >
              {label}
            </label>
          )}
      <Textarea placeholder={placeholder} id={id}
        className="mt-16 min-h-[80px] px-[21px] py-[14px] rounded-[10px] border-input-border outline-0" />
      {error && (
          <div className="flex items-center mt-[10px] gap-[4px]">
            <MdErrorOutline size={18} className="text-error" />
            <p className="text-left text-error text-xs">{error}</p>
          </div>
        )}
    </div>
  
      )
}