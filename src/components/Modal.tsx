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

const Modal = ({
  description,
  onConfirm,
  onCancel,
  open,
  onOpenChange,
}: {
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const handleCancel = () => {
    onOpenChange(false);
    onCancel();
  };

  const handleConfirm = () => {
    onOpenChange(false);
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/70" />
      <DialogContent
        aria-describedby={undefined}
        className="w-[800px] min-h-[300px] rounded-[30px] py-[62px] px-[86px] bg-white text-center gap-0"
        onPointerDownOutside={e => e.preventDefault()}
        aria-labelledby="dialog-content"
      >
        <img
          className="absolute top-16 left-16 h-[250px]"
          src={tracks4}
          alt="background"
        />
        <DialogClose className="absolute top-32 right-32">
          <CloseSVG size="22" />
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
            onClick={handleConfirm}
          >
            Так
          </CustomButton>
          <CustomButton
            styleType="defaultButton"
            className="w-100 h-[45px] m-0"
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
