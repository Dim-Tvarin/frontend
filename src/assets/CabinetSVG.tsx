import { cn } from 'components/lib/utils';
import type { ReactElement } from 'react';
import { FiUser } from 'react-icons/fi';

const CabinetSVG = ({
  className,
  size = '24',
}: {
  className?: string;
  size?: string;
}): ReactElement => {
  return (
    <div className="flex justify-center items-center w-32 h-32">
      <FiUser
        size={size}
        className={cn('white hover:default-btn dark:black', className)}
      />
    </div>
  );
};
export default CabinetSVG;
