import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from './components/ui/dialog';
import { CustomButton } from './CustomButton';
import CloseSVG from 'src/assets/CloseSVG';
import tracks4 from 'src/assets/tracks4.png';
import type { AppDispatch, RootState } from 'src/redux/store';
import { closeDialog } from 'src/redux/dialogs/dialogSlice';

const Modal = ({
  description,
  onConfirm,
  onCancel,
}: {
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );
  const handleCancel = () => {
    onCancel();
    dispatch(closeDialog());
  };

  const handleConfirm = () => {
    onConfirm();
    dispatch(closeDialog());
  };

  return (
    <Dialog
      open={activeDialog === 'modal'}
      onOpenChange={() => dispatch(closeDialog())}
    >
      <DialogOverlay className="bg-black/70" />
      <DialogContent
        aria-describedby={undefined}
        className="gap-0 bg-white px-[86px] py-[62px] rounded-[30px] w-[800px] min-h-[300px] text-center"
        onPointerDownOutside={e => e.preventDefault()}
        aria-labelledby="dialog-content"
      >
        <img
          className="top-16 left-16 absolute h-[250px]"
          src={tracks4}
          alt="background"
        />
        <DialogClose className="top-24 right-24 absolute focus:outline-none focus-visible:outline-none">
          <CloseSVG />
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="sr-only">Confirmation</DialogTitle>
          <p className="mb-[47px] text-[28px] text-default-btn text-center leading-[150%]">
            {description}
          </p>
        </DialogHeader>
        <div className="flex justify-center gap-50">
          <CustomButton
            styleType="defaultButton"
            className="bg-error-input m-0 w-100 h-[45px]"
            onClick={handleConfirm}
          >
            Так
          </CustomButton>
          <CustomButton
            styleType="defaultButton"
            className="m-0 w-100 h-[45px]"
            onClick={handleCancel}
          >
            Ні
          </CustomButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
