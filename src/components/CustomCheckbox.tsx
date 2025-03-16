import type { FC } from "react";
import { Checkbox } from "./components/ui/checkbox"
import { cn } from "./lib/utils";

interface CheckboxProps {
  label?: string;
  id: string;
  disabled?: boolean;
  className?: string;
}

const CustomCheckbox: FC<CheckboxProps> = ({label, id, disabled, className }) => {
 
  return (
    <div>
      <Checkbox id={id} disabled={disabled}
        className={cn("w-24 h-24 rounded-full", className)} />
      {label && (<label htmlFor={id} className="text-s ml-8">{label}</label>)}
    </div>
  )
}

export default CustomCheckbox