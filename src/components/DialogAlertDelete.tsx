import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from './components/ui/dialog';
import type { AppDispatch, RootState } from '../redux/store';
import { closeDialog } from 'src/redux/dialogs/dialogSlice';
import { CustomButton } from './CustomButton';
import { showToast } from './Toast';
import {
  useDeleteMyAnimalsMutation,
  useGetMyAnimalsQuery,
} from 'src/redux/animals/animalsApi';
import CloseSVG from 'src/assets/CloseSVG';
import { Spinner } from './Spinner';
import { logoutThunk } from 'src/redux/users/usersOperations';
import { useDeleteUserMutation } from 'src/redux/users/usersApi';
import { removeAnimal } from 'src/redux/animals/favoriteAnimalsSlice';
import { removeViewedAnimal } from 'src/redux/animals/viewedAnimalsSlice';
import pawsBgLight from '../assets/bg-paws-alert.png';
import pawsBgDark from '../assets/bg-paws-alert-dark.png';
import pawsBgLightMob from '../assets/bg-paws-alert-mob.png';
import pawsBgDarkMob from '../assets/bg-paws-alert-dark-mob.png';
import { cn } from './lib/utils';
import { useWindowSize } from '@uidotdev/usehooks';
import { selectUserTheme } from 'src/redux/users/usersSlice';

const DialogAlertDelete = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );
  const { refetch } = useGetMyAnimalsQuery({ page: 1, limit: 9 });
  if (
    typeof activeDialog !== 'object' ||
    activeDialog?.type !== 'alertDelete'
  ) {
    return null;
  }
  const isOpen =
    typeof activeDialog === 'object' && activeDialog.type === 'alertDelete';
  if (!isOpen) return null;

  const entity = activeDialog.entity;
  const id = 'id' in activeDialog ? activeDialog.id : null;

  const [deleteMyAnimal, { isLoading: isDeletingAnimal }] =
    useDeleteMyAnimalsMutation();
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      if (entity === 'animal' && id) {
        await deleteMyAnimal(id).unwrap();
        dispatch(removeAnimal(id));
        dispatch(removeViewedAnimal(id));
        await refetch();
        showToast({ title: 'Оголошення видалено', status: 'success' });
      } else if (entity === 'user') {
        await deleteUser().unwrap();
        showToast({ title: 'Акаунт видалено', status: 'success' });
        dispatch(logoutThunk());
      }
    } catch {
      showToast({ title: 'Помилка при видаленні', status: 'error' });
    } finally {
      dispatch(closeDialog());
    }
  };

  const config = {
    animal: {
      description:
        'Ви дійсно хочете видалити це оголошення? Всі дані будуть безповоротно втрачені.',
      isLoading: isDeletingAnimal,
    },
    user: {
      description:
        'Ви дійсно хочете видалити профіль? Всі дані будуть безповоротно втрачені.',
      isLoading: isDeletingUser,
    },
  } as const;

  const { description, isLoading } = config[entity];
  const windowSize = useWindowSize();
  const mobileSize = windowSize.width !== null && windowSize.width < 1024;

  const theme = useSelector(selectUserTheme);
  const pawsBg = theme === 'light' ? pawsBgLight : pawsBgDark;
  const pawsBgMob = theme === 'light' ? pawsBgLightMob : pawsBgDarkMob;

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(closeDialog())}>
      <DialogOverlay className="bg-black/70" />
      <DialogContent
        className="max-w-full sm:w-[380px] lg:w-[800px] min-h-0.5 sm:min-h-[237px] lg:h-[300px] rounded-[30px] py-24 px-16 lg:py-[62px] lg:px-[86px] bg-dialog text-center gap-0"
        onPointerDownOutside={e => e.preventDefault()}
        aria-labelledby="dialog-content"
        aria-describedby={undefined}
      >
        <div
          className={cn(
            'absolute top-[13px] lg:top-[25px] left-[6px] lg:left-[94px] w-[97px] lg:w-40 h-[211px] lg:h-[180px] bg-contain bg-no-repeat'
          )}
          style={{
            backgroundImage: `url(${mobileSize ? pawsBgMob : pawsBg})`,
          }}
        />
        <div
          className="hidden lg:block absolute bottom-[20px] lg:bottom-[25px] left-[12px] lg:left-[54px] w-40 h-[157px] lg:h-[180px] bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${pawsBg})` }}
        />
        <DialogClose className="absolute top-24 right-24 focus:outline-none focus-visible:outline-none">
          <CloseSVG />
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="sr-only">Confirmation</DialogTitle>
          <p className="text-base lg:text-[28px] leading-[150%] text-default-btn text-center mt-[42px] lg:mt-0 px-50 lg:p-0 mb-[30px] lg:mb-[47px]">
            {description}
          </p>
        </DialogHeader>
        <div className="flex gap-50 justify-center">
          <CustomButton
            styleType="defaultButton"
            className="w-100 h-[45px] m-0 bg-error-input"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Так'}
          </CustomButton>
          <CustomButton
            styleType="defaultButton"
            className="w-100 h-[45px] m-0"
            onClick={() => dispatch(closeDialog())}
            disabled={isLoading}
          >
            Ні
          </CustomButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DialogAlertDelete;
