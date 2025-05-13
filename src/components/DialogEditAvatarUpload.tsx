import * as Dialog from '@radix-ui/react-dialog';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, openDialog } from 'src/redux/dialogs/dialogSlice';
import {
  DialogHeader,
  DialogOverlay,
  DialogFooter,
} from './components/ui/dialog';
import { CustomButton } from './CustomButton';
import { FiUpload } from 'react-icons/fi';
import { useCallback, useState } from 'react';
import type { RootState, AppDispatch } from 'src/redux/store';
import { useImageCrop } from 'src/context/ImageCropContext';

const MAX_SIZE_MB = 2;
const ACCEPTED_TYPES = {
  'image/jpeg': [],
  'image/png': [],
  'image/gif': [],
};

const DialogEditAvatarUpload: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeDialog = useSelector(
    (state: RootState) => state.dialog.activeDialog
  );
  const isOpen = activeDialog === 'editAvatarUpload';
  if (!isOpen) return null;

  const { setCropFile } = useImageCrop();
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (!(file.type in ACCEPTED_TYPES)) {
        setError('Непідтримуваний формат файлу');
        return;
      }

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError('Максимальний розмір файлу — 2 МБ');
        return;
      }

      setError(null);
      setCropFile(file);
      dispatch(openDialog('editAvatarCrop'));
    },
    [setCropFile, dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
    },
    maxFiles: 1,
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => dispatch(closeDialog())}>
      <Dialog.Portal>
        <DialogOverlay className="fixed inset-0 bg-black/70 z-40" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-50 rounded-2xl w-[560px]"
          onPointerDownOutside={e => e.preventDefault()}
        >
          <DialogHeader>
            <Dialog.Title className="text-xl font-bold text-default-btn mb-30">
              Додайте фото
            </Dialog.Title>
          </DialogHeader>

          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-400 rounded-xl p-30 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <input {...getInputProps()} />
            <FiUpload className="mx-auto mb-10" size={36} />
            <p className="text-sm text-gray-600">
              {isDragActive
                ? 'Відпустіть файл тут...'
                : 'Перетягніть файл сюди або натисніть, щоб вибрати'}
            </p>
          </div>

          {error && (
            <p className="text-red-500 mt-10 text-sm text-center">{error}</p>
          )}

          <DialogFooter className="flex justify-end gap-20 mt-30">
            <CustomButton
              type="button"
              styleType="whiteButton"
              className="w-[140px]"
              onClick={() => dispatch(closeDialog())}
            >
              Скасувати
            </CustomButton>
          </DialogFooter>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogEditAvatarUpload;
