import { zodResolver } from '@hookform/resolvers/zod';
import BreedSelect from 'components/BreedSelect';
import { CitySelect } from 'components/CitySelect';
import { CustomButton } from 'components/CustomButton';
import CustomRadioGroup from 'components/CustomRadioGroup';
import { TextareaDemo } from 'components/CustomTextarea';
import FormError from 'components/FormError';
import ImageCarousel from 'components/ImageCarousel';
import { InputField } from 'components/InputField';
import PetPageSceleton from 'components/sceletons/PetPageSceleton';
import { Spinner } from 'components/Spinner';
import { showToast } from 'components/Toast';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import {
  useEditAnimalMutation,
  useGetAnimalByIdQuery,
} from 'src/redux/animals/animalsApi';
import type { z } from 'zod';
import {
  animalTypeOptions,
  genderOption,
  statusOptions,
  StatusType,
  type AnimalTypeValues,
  type ErrorResponse,
} from './types';
import {
  getMonthDeclension,
  getYearDeclension,
} from 'src/helpers/getYearDeclension';

import { updateAnnounceSchema } from '../../validations/updateAnnounceValidation';
import { useState } from 'react';
import Modal from 'components/Modal';
import { FilesInput } from 'components/FilesInputWithCrop';
import { openDialog } from 'src/redux/dialogs/dialogSlice';
import type { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import type { AxiosError } from 'axios';

type AnnouncementForm = z.infer<typeof updateAnnounceSchema>;

const EditAnnouncement = () => {
  const [isFocusedYear, setIsFocusedYear] = useState(false);
  const [isFocusedMonth, setIsFocusedMonth] = useState(false);
  const [imagesForDelete, setImagesForDelete] = useState([] as string[]);
  const [openModal, setOpenModal] = useState(false);
  const [idForDelete, setIdForDelete] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  if (!id) {
    showToast({
      title: 'Щось пішло не по плану',
      description: 'Це оголошення не було знайдено',
      status: 'error',
    });
    setTimeout(() => navigate(`/allpets/${id}`), 1000);
    return;
  }
  const { data, refetch, error, isLoading } = useGetAnimalByIdQuery(id);
  const [editAnimal, { isLoading: isEditingAnimal }] = useEditAnimalMutation();
  const { animal } = data || {};

  const {
    register,
    watch,
    handleSubmit,
    resetField,
    control,
    formState: { errors },
  } = useForm<AnnouncementForm>({
    resolver: zodResolver(updateAnnounceSchema),
    mode: 'onChange',
    defaultValues: {
      animalType: animal?.animalType,
      gender: animal?.gender ?? undefined,
      breed: animal?.breed,
      animalLocation: animal?.animalLocation,
    },
  });
  const animalTypeValue = watch('animalType');
  const genderValue = watch('gender');
  const statusValue = watch('status');

  if (isLoading) {
    return <PetPageSceleton />;
  }
  if (error) {
    showToast({
      title: 'Щось пішло не по плану',
      description: 'Виникла помилка при завантаженні даних',
      status: 'error',
    });
    setTimeout(() => navigate('/allpets'), 1000);
    return;
  }

  const filteredImages =
    animal?.animalImages.filter(
      image => !imagesForDelete.includes(image.publicId)
    ) || [];

  const handleDeleteImage = (imageId: string) => {
    if (
      animal?.animalImages &&
      animal?.animalImages?.length - imagesForDelete.length === 1
    ) {
      showToast({
        title: 'Ви не можете видалити всі зображення',
        status: 'error',
      });
    } else {
      dispatch(openDialog('modal'));
      setOpenModal(true);
      setIdForDelete(imageId);
    }
  };

  const onSubmit = async (
    data: AnnouncementForm & { imagesToDelete?: string[] }
  ) => {
    if (!animal) return;
    const { images, ...otherData } = data;

    const bodyData = new FormData();
    if (images && images?.length > 0) {
      images?.forEach((image: File) => bodyData.append('images', image));
    }

    if (imagesForDelete && imagesForDelete.length > 0) {
      otherData.imagesToDelete = imagesForDelete;
    }

    bodyData.append(
      'animalData',
      JSON.stringify({
        ...otherData,
      })
    );

    try {
      await editAnimal({ id: animal?.id, formData: bodyData }).unwrap();
      showToast({
        title: 'Оголошення успішно оновлене',
        status: 'success',
      });
      resetField('images');
      await refetch();
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      if ('status' in error) {
        switch (error.status) {
          case 400:
            showToast({
              title: 'Неправильний запит',
              description: 'Перевірте введені дані',
              status: 'error',
            });
            break;
          case 401:
            showToast({
              title: 'Щось пішло не по плану',
              description:
                'Вам потрібно авторизуватися, щоб редагувати оголошення',
              status: 'error',
            });
            break;
          case 404:
            showToast({
              title: 'Щось пішло не по плану',
              description: 'Ми не знайшли тваринку з таким ID',
              status: 'error',
            });
            break;
          default:
            console.error('Ошибка:', error.status);
        }
      } else {
        showToast({
          title: 'Щось пішло не по плану',
          description: 'Виникла помилка при редагуванні оголошення',
          status: 'error',
        });
      }

      return;
    }
  };

  const defaultTypes: AnimalTypeValues[] = ['cats', 'dogs', 'birds'];
  const resolvedType: AnimalTypeValues = defaultTypes.includes(
    animal?.animalType as AnimalTypeValues
  )
    ? (animal?.animalType as AnimalTypeValues)
    : 'other';

  return (
    <>
      <div className="z-10 relative gap-x-[18px] gap-y-16 lg:gap-y-[32px] grid grid-cols-1 lg:grid-cols-[1fr_1fr] lg:grid-rows-[150px_1fr] lg:auto-rows-fr text-default-btn container">
        <h2 className="z-10 order-1 lg:col-start-1 lg:row-span-1 lg:row-start-1 mt-40 lg:mt-100 mb-16 lg:mb-32 h-48 lg:text-[32px] text-lg">
          Редагувати оголошення
        </h2>
        <div className="flex flex-col flex-1/2 order-3 lg:col-start-1 lg:row-span-1 lg:row-start-2 mb-100">
          <form
            className="flex flex-col items-start"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="z-10 mb-10 text-base">Оберіть вид тварини *</p>
            <Controller
              defaultValue={animal?.animalType}
              name="animalType"
              control={control}
              render={({ field: { onChange, name, onBlur, ref } }) => (
                <CustomRadioGroup
                  items={animalTypeOptions}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2"
                  error={errors.animalType?.message}
                  name={name}
                  ref={ref}
                  value={animalTypeValue || resolvedType}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />

            <p className="mt-16 lg:mt-32 mb-10 text-base">Стать</p>
            <Controller
              defaultValue={animal?.gender}
              name="gender"
              control={control}
              render={({ field: { onChange, name, onBlur, ref } }) => (
                <CustomRadioGroup
                  items={genderOption}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2"
                  error={errors.gender?.message}
                  name={name}
                  ref={ref}
                  value={genderValue || animal?.gender}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />

            <div className="flex-wrap gap-0 md:gap-20 grid md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 mt-16 lg:mt-32 w-full">
              <div className="gap-x-16 lg:gap-[10px] grid grid-cols-2 w-full md:w-[296px]">
                <Controller
                  name="age.years"
                  control={control}
                  defaultValue={animal?.age.years || 0}
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <InputField
                      ref={ref}
                      id="years"
                      value={
                        isFocusedYear
                          ? value
                          : getYearDeclension(Number(value) || 0)
                      }
                      onFocus={e => {
                        e.target.value = `${value || 0}`;
                        setIsFocusedYear(true);
                      }}
                      onBlur={e => {
                        const parsed = parseInt(e.target.value, 10) || 0;
                        onChange(parsed);
                        setIsFocusedYear(false);
                        onBlur();
                      }}
                      onChange={e => {
                        const parsed = parseInt(e.target.value, 10) || 0;
                        onChange(parsed);
                      }}
                      inputMode="numeric"
                      type="text"
                      placeholder="0 років"
                      className="w-full lg:w-[150px] h-[40px] text-base"
                      label="Вік"
                      labelSize="base"
                    />
                  )}
                />
                <Controller
                  name="age.months"
                  control={control}
                  defaultValue={animal?.age.months || 0}
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <InputField
                      ref={ref}
                      id="months"
                      value={
                        isFocusedMonth
                          ? value
                          : getMonthDeclension(Number(value) || 0)
                      }
                      onFocus={e => {
                        e.target.value = `${value || 0}`;
                        setIsFocusedMonth(true);
                      }}
                      onBlur={e => {
                        const parsed = parseInt(e.target.value, 10) || 0;
                        onChange(parsed);
                        setIsFocusedMonth(false);
                        onBlur();
                      }}
                      onChange={e => {
                        const parsed = parseInt(e.target.value, 10) || 0;
                        onChange(parsed);
                      }}
                      inputMode="numeric"
                      type="text"
                      placeholder="0 місяців"
                      className="w-full lg:w-[150px] h-[40px] text-base"
                      label=" "
                    />
                  )}
                />
                {errors.age?.months?.message && (
                  <FormError error={errors.age?.months?.message} />
                )}
                {errors.age?.years?.message && (
                  <FormError error={errors.age?.years?.message} />
                )}
              </div>
              <div className="mt-16 md:mt-0 w-full md:w-[296px] lg:w-[305px]">
                <p className="mb-10 text-base text-left">Порода *</p>
                <Controller
                  name="breed"
                  control={control}
                  render={({ field }) => (
                    <BreedSelect
                      defaultValue={animal?.breed}
                      onChange={field.onChange}
                      className="w-full h-[40px]"
                      type={animalTypeValue || animal?.animalType}
                      errorMess={errors?.breed?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="gap-10 lg:gap-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 mt-16 lg:mt-32 w-full">
              <InputField
                label="Ім’я тварини *"
                id="animalName"
                className="mt-10 w-full md:w-[296px] lg:w-[305px] h-[40px] text-base"
                labelSize="base"
                defaultValue={animal?.animalName}
                {...register('animalName')}
                error={errors.animalName?.message}
              />
              <div className="md:-mt-4 w-full md:w-[296px] lg:w-[305px]">
                <p className="mb-10 text-base text-left">Місто * </p>
                <Controller
                  name="animalLocation"
                  control={control}
                  render={({ field }) => (
                    <CitySelect
                      defaultValue={animal?.animalLocation}
                      onChange={field.onChange}
                      value={animal?.animalLocation}
                      className="h-[40px]"
                      widthClass="w-full"
                      errorMess={errors?.animalLocation?.message}
                    />
                  )}
                />
              </div>
            </div>

            <TextareaDemo
              id="announvementText"
              className="mt-10 lg:mt-32 text-base text-left"
              placeholder="Опишіть тварину, її характер, історію, забарвлення"
              label="Опис тварини: *"
              defaultValue={animal?.adText}
              labelSize="base"
              {...register('adText')}
              error={errors.adText?.message}
            />

            <p className="mt-16 lg:mt-32 mb-10 text-base">Статус</p>
            <Controller
              defaultValue={animal?.status as StatusType}
              name="status"
              control={control}
              render={({ field: { onChange, name, onBlur, ref } }) => (
                <CustomRadioGroup
                  items={statusOptions}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2"
                  error={errors.status?.message}
                  name={name}
                  ref={ref}
                  value={statusValue || animal?.status}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              name="images"
              control={control}
              defaultValue={[]}
              render={({ field: { ref, name, onChange, value } }) => (
                <FilesInput
                  ref={ref}
                  groupLabel="Добавте фото *"
                  labelClass="mb-16 mt-16"
                  labelSize="base"
                  className="w-full"
                  name={name}
                  onChange={onChange}
                  error={errors.images?.message?.toString()}
                  value={value || []}
                  defaultValue={animal?.animalImages}
                  imagesForDelete={imagesForDelete.length}
                />
              )}
            />

            <CustomButton
              type="submit"
              styleType="defaultButton"
              disabled={isLoading || isEditingAnimal}
              className="z-10 flex gap-8 w-[196px] text-base"
            >
              {isLoading || (isEditingAnimal && <Spinner />)}
              Зберегти зміни
            </CustomButton>
          </form>
        </div>

        <div className="flex flex-col items-center gap-32 order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 m-0 lg:my-100">
          <ImageCarousel
            images={filteredImages}
            isDelete
            onDelete={handleDeleteImage}
          />
        </div>
      </div>
      {openModal && (
        <Modal
          onCancel={() => {
            setIdForDelete('');
          }}
          onConfirm={() => {
            setImagesForDelete(prev => [...prev, idForDelete]);
            setIdForDelete('');
            showToast({
              title: 'Зображення підготовлено для видалення',
              description:
                'Для підтвердження натисніть кнопку "Зберегти зміни"',
              status: 'success',
            });
          }}
          description="Ви дійсно хочете видалити це зображення?"
        />
      )}
    </>
  );
};

export default EditAnnouncement;
