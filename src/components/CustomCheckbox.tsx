import type { FC } from "react";
import { Checkbox } from "./components/ui/checkbox"

interface CheckboxProps {
  label?: string;
  id: string;
  disabled?: boolean;
}

const CustomCheckbox: FC<CheckboxProps> = ({label, id, disabled }) => {
 
  return (
    <div>
      <Checkbox id={id} disabled={disabled} className="w-24 h-24 rounded-full"  />
      {label && (<label htmlFor={id} className="text-s ml-8">{label}</label>)}
    </div>
  )
}

export default CustomCheckbox