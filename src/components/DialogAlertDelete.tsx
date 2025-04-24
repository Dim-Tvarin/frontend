import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
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

const DialogAlertDelete = ({ id }: { id: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );
  const [deleteMyAnimal, { isLoading }] = useDeleteMyAnimalsMutation();
  const { refetch } = useGetMyAnimalsQuery({ page: 1, limit: 9 });
  const handleDelete = async (id: string) => {
    try {
      await deleteMyAnimal(id).unwrap();
      await refetch();
      showToast({ title: 'Оголошення видалено', status: 'success' });
    } catch (err) {
      showToast({ title: 'Помилка при видаленні', status: 'error' });
      console.error(err);
    } finally {
      dispatch(closeDialog());
    }
  };
  return (
    <Dialog
      open={
        typeof activeDialog === 'object' && activeDialog?.type === 'alertDelete'
      }
      onOpenChange={() => dispatch(closeDialog())}
    >
      <DialogOverlay className="bg-black/70" />

      <DialogContent
        className="w-[800px] min-h-[300px] rounded-[30px] py-[62px] px-[86px] bg-dialog text-center gap-0"
        onPointerDownOutside={e => e.preventDefault()}
        aria-labelledby="dialog-content"
      >
        <div className="absolute top-[25px] left-[94px] w-40 h-[180px] bg-[url('./src/assets/backgrounds/bg-paws-alert.png')] bg-contain bg-no-repeat " />
        <div className="absolute bottom-[25px] left-[54px] w-40 h-[180px] bg-[url('./src/assets/backgrounds/bg-paws-alert.png')] bg-contain bg-no-repeat " />
        <DialogClose className="absolute top-32 right-32 ">
          <CloseSVG size="22" />
        </DialogClose>
        <DialogHeader>
          <p className="text-[28px] leading-[150%] text-default-btn text-center mb-[47px]">
            Ви дійсно хочете видалити це оголошення? Всі дані будуть
            безповоротно втрачені.
          </p>
        </DialogHeader>
        <div className="flex gap-50 justify-center">
          <CustomButton
            styleType="defaultButton"
            className="w-100 h-[45px] m-0 bg-error-input"
            onClick={() => handleDelete(id)}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Так'}
          </CustomButton>
          <CustomButton
            styleType="defaultButton"
            className="w-100 h-[45px] m-0 "
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
