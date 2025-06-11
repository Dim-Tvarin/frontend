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
        'Ви дійсно хочете видалити ваш акаунт? Цю дію неможливо скасувати.',
      isLoading: isDeletingUser,
    },
  } as const;

  const { description, isLoading } = config[entity];

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(closeDialog())}>
      <DialogOverlay className="bg-black/70" />
      <DialogContent
        className="w-[800px] min-h-[300px] rounded-[30px] py-[62px] px-[86px] bg-dialog text-center gap-0"
        onPointerDownOutside={e => e.preventDefault()}
        aria-labelledby="dialog-content"
        aria-describedby={undefined}
      >
        <div className="absolute top-[25px] left-[94px] w-40 h-[180px] bg-[url('./src/assets/bg-paws-alert.png')] bg-contain bg-no-repeat " />
        <div className="absolute bottom-[25px] left-[54px] w-40 h-[180px] bg-[url('./src/assets/bg-paws-alert.png')] bg-contain bg-no-repeat " />
        <DialogClose className="absolute top-24 right-24 focus:outline-none focus-visible:outline-none">
          <CloseSVG />
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="sr-only">Confirmation</DialogTitle>
          <p className="text-[28px] leading-[150%] text-default-btn text-center mb-[47px]">
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
