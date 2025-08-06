import { cn } from 'components/lib/utils';
import type { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectUserTheme } from 'src/redux/users/usersSlice';
import avatarLight from 'src/assets/avatar-light.png';
import avatarDark from 'src/assets/avatar-dark.png';
import { FiUser } from 'react-icons/fi';
import { useWindowSize } from '@uidotdev/usehooks';

const CabinetSVG = ({
  className,
  size = 24,
}: {
  className?: string;
  size?: number;
}): ReactElement => {
  const windowSize = useWindowSize();
  const tabletSize = windowSize.width !== null && windowSize.width < 1024;
  const theme = useSelector(selectUserTheme);
  return tabletSize ? (
    <div className="flex justify-center items-center w-9 h-9">
      <img
        src={theme === 'light' ? avatarLight : avatarDark}
        alt="Вхід в особистий кабінет"
        className={cn('object-contain', className)}
      />
    </div>
  ) : (
    <div className="flex justify-center items-center w-32 h-32">
      <FiUser
        size={size}
        className={cn('white hover:default-btn dark:black', className)}
      />
    </div>
  );
};
export default CabinetSVG;
