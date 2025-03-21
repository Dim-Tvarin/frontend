import { Textarea } from "./components/ui/textarea"
import { cn } from "./lib/utils";

 
export const TextareaDemo = ({ placeholder, label, id, className }:
  { id: string;
    placeholder: string;
    label?: string;
    className?: string;
    
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
        className="mt-16 min-h-[80px] px-[21px] py-[14px] rounded-[10px] border-input-border outline-0"/>
    </div>
  
      )
}