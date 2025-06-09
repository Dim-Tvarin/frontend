import type { FC, MouseEvent } from 'react';
import CloseSVG from 'src/assets/CloseSVG';

interface LabelFilterProps {
  label: string;
  onRemove: (e: MouseEvent<HTMLButtonElement>) => void;
}

const FileterLabel: FC<LabelFilterProps> = ({ label, onRemove }) => {
  if (label === 'Малий') {
    label = 'маленький';
  }
  return (
    <div className="flex items-center gap-5 bg-white px-8 py-4 border border-input-border rounded-[10px] text-default-btn text-base">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="text-default-btn hover:text-red-500 transition-colors"
        aria-label={`Remove ${label}`}
      >
        <CloseSVG />
      </button>
    </div>
  );
};

export default FileterLabel;
