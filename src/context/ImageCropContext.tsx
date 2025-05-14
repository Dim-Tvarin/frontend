import { createContext, useContext, useRef } from 'react';

type CropHandler = (file: File) => void;
type FormSubmit = () => void;

type ImageCropContextType = {
  setImageAfterCrop: (handler: CropHandler) => void;
  getImageAfterCrop: () => CropHandler | null;
  setCropFile: (file: File) => void;
  getCropFile: () => File | null;
  setFormSubmit: (submitFn: FormSubmit) => void;
  triggerFormSubmit: () => void;
};

const ImageCropContext = createContext<ImageCropContextType | null>(null);

export const ImageCropProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cropHandlerRef = useRef<CropHandler | null>(null);
  const fileRef = useRef<File | null>(null);
  const formSubmitRef = useRef<FormSubmit | null>(null);

  const contextValue: ImageCropContextType = {
    setImageAfterCrop: handler => {
      cropHandlerRef.current = handler;
    },
    getImageAfterCrop: () => cropHandlerRef.current,
    setCropFile: file => {
      fileRef.current = file;
    },
    getCropFile: () => fileRef.current,
    setFormSubmit: submitFn => {
      formSubmitRef.current = submitFn;
    },
    triggerFormSubmit: () => {
      formSubmitRef.current?.();
    },
  };

  return (
    <ImageCropContext.Provider value={contextValue}>
      {children}
    </ImageCropContext.Provider>
  );
};

export const useImageCrop = () => {
  const context = useContext(ImageCropContext);
  if (!context)
    throw new Error('useImageCrop must be used within ImageCropProvider');
  return context;
};
