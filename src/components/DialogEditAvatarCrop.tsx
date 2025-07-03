import * as Dialog from '@radix-ui/react-dialog';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from 'src/redux/dialogs/dialogSlice';
import {
  DialogHeader,
  DialogOverlay,
  DialogFooter,
} from './components/ui/dialog';
import { CustomButton } from './CustomButton';
import { useImageCrop } from 'src/context/ImageCropContext';
import { useState } from 'react';
import Cropper, { type Area } from 'react-easy-crop';

import type { RootState } from 'src/redux/store';
import getCroppedImg from 'src/helpers/cropImage';
import CloseSVG from 'src/assets/CloseSVG';

const DialogEditAvatarCrop: React.FC = () => {
  const dispatch = useDispatch();
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );
  const isOpen = activeDialog === 'editAvatarCrop';

  const { getCropFile, getImageAfterCrop, triggerFormSubmit } = useImageCrop();
  const file = getCropFile();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = (_: unknown, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSave = async () => {
    if (!file || !croppedAreaPixels) return;

    const cropped = await getCroppedImg(file, croppedAreaPixels);
    const croppedFile = new File([cropped], file.name, {
      type: file.type,
    });

    getImageAfterCrop()?.(croppedFile);
    triggerFormSubmit();
    dispatch(closeDialog());
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => dispatch(closeDialog())}>
      <Dialog.Portal>
        <DialogOverlay className="fixed inset-0 bg-black/70 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-32 rounded-[30px] w-full lg:w-[754px] max-h-[661px]">
          <Dialog.Close className="absolute top-24 right-24 focus:outline-none focus-visible:outline-none">
            <CloseSVG />
          </Dialog.Close>
          <DialogHeader>
            <Dialog.Title className="text-xl leading-[140%] text-default-btn mb-20">
              Обріжте фото
            </Dialog.Title>
          </DialogHeader>
          {file && (
            <div className="relative w-full lg:w-[690px] h-[470px] bg-black rounded-md overflow-hidden">
              <Cropper
                image={URL.createObjectURL(file)}
                crop={crop}
                onCropChange={setCrop}
                zoom={zoom}
                onZoomChange={setZoom}
                aspect={1}
                onCropComplete={onCropComplete}
                cropSize={{ width: 305, height: 305 }}
              />
            </div>
          )}
          <DialogFooter className="flex flex-row justify-center gap-20 mt-32">
            <CustomButton
              styleType="whiteButton"
              className="w-[157px] m-0"
              onClick={() => dispatch(closeDialog())}
            >
              Скасувати
            </CustomButton>
            <CustomButton
              styleType="defaultButton"
              className="w-[157px] m-0"
              onClick={handleSave}
            >
              Зберегти
            </CustomButton>
          </DialogFooter>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogEditAvatarCrop;
