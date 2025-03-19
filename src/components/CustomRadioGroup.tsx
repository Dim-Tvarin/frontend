import type { FC } from "react";
import { Label } from "./components/ui/label"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import { cn } from "./lib/utils";



type Item = {
  value: string;
  label: string;
}

interface RadioProps {
  defaultValue?: string;
  className?: string;
  items: Item[];
  itemWidth?: string;
}


const CustomRadioGroup: FC<RadioProps> = ({defaultValue, items,className, itemWidth }) => {
  return (
    <RadioGroup defaultValue={defaultValue} className={cn("flex gap-20", className)}>
      {items.map(item => (
        <div className={cn(" flex items-center gap-8 rounded-lg p-8 border-1 border-input-border", itemWidth ? `w-[${itemWidth}px]` : 'w-[197px]')}
           key={item.value}>
          <RadioGroupItem value={item.label } id={item.value } className="ring-[1px] w-20 h-20 data-[state=checked]:ring-2 focus:outline-none"/>
          <Label className="text-s" htmlFor={item.value }>{item.label }</Label>
        </div>
      ))}
      </RadioGroup>
  )
}


export default CustomRadioGroup