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
import { useCallback, useState } from 'react';
import type { RootState, AppDispatch } from 'src/redux/store';
import { useImageCrop } from 'src/context/ImageCropContext';
import PhotoPrev from './PhotoPrev';
import FormError from './FormError';
import CloseSVG from 'src/assets/CloseSVG';

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
  const [file, setFile] = useState<File | null>(null);

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
      setFile(file);
      setCropFile(file);
    },
    [setCropFile]
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
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
        <DialogOverlay className="fixed inset-0 bg-black/70" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white pt-32 px-16 pb-50 lg:p-50 align-center rounded-2xl w-full lg:w-[955px] max-h-[535px] lg:max-h-[488px] focus-visible:outline-none"
          onPointerDownOutside={e => e.preventDefault()}
        >
          <Dialog.Close className="absolute top-24 right-24 focus:outline-none focus-visible:outline-none">
            <CloseSVG />
          </Dialog.Close>
          <div className="lg:px-[113px]">
            <DialogHeader>
              <Dialog.Title className="text-left text-default-btn leading-[150%] mb-10 ">
                Додайте фото
              </Dialog.Title>
            </DialogHeader>
            <div
              {...getRootProps()}
              className={`m-auto w-[328px] lg:w-[630px] h-[190px] pt-[34px] px-10 pb-[43px] lg:p-[42px] border-2 border-dashed  rounded-[10px] text-center mb-32 ${isDragActive ? 'border-default-btn bg-main-pink-d' : 'border-border-drag bg-main-pink-l'}`}
            >
              <p className="text-lg text-default-btn mb-[27px] lg:mb-16">
                {isDragActive ? (
                  'Відпустіть файл тут...'
                ) : (
                  <>Перетягніть файл сюди</>
                )}
              </p>
              <div className="flex items-center gap-[16px] lg:gap-[19px] px-16 py-10 border-2 border-border-drag rounded-[8px] w-[308px] lg:w-[382px] h-[64px] m-auto">
                <label className="cursor-pointer">
                  <CustomButton
                    as="span"
                    styleType="defaultButton"
                    className="m-0 w-[130px] lg:w-[149px]"
                    onClick={open}
                    disabled={!!file}
                  >
                    Вибрати файл
                  </CustomButton>
                  <input {...getInputProps()} hidden />
                </label>
                {!file && (
                  <p className="flex text-border-file text-base shrink-0">
                    Файл не вибрано
                  </p>
                )}
              </div>
            </div>
            {file && (
              <PhotoPrev
                image={file}
                index={0}
                ondelete={() => setFile(null)}
              />
            )}
            {error && <FormError error={error} />}
          </div>

          <DialogFooter className="flex flex-col lg:flex-row gap-20 items-center sm:justify-center mt-32">
            <CustomButton
              type="button"
              styleType="defaultButton"
              className="w-[188px] lg:w-[236px] text-base m-0"
              onClick={() => {
                if (!file) return;
                setError(null);
                setCropFile(file);
                dispatch(openDialog('editAvatarCrop'));
              }}
            >
              Зберегти зміни
            </CustomButton>
            <CustomButton
              type="button"
              styleType="whiteButton"
              className="w-[188px] lg:w-[157px] h-[44px] text-base m-0"
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
