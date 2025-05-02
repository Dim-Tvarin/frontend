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
  type AnimalTypeValues,
} from './types';
import {
  getMonthDeclension,
  getYearDeclension,
} from 'src/helpers/getYearDeclension';
import { FilesInput } from 'components/FilesInput';
import { updateAnnounceSchema } from '../../validations/updateAnnounceValidation';
import { useState } from 'react';

type AnnouncementForm = z.infer<typeof updateAnnounceSchema>;

const EditAnnouncement = () => {
  const [isFocusedYear, setIsFocusedYear] = useState(false);
  const [isFocusedMonth, setIsFocusedMonth] = useState(false);
  const [imagesForDelete, setImagesForDelete] = useState([] as string[]);
  const navigate = useNavigate();
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
  const { data, error, isLoading } = useGetAnimalByIdQuery(id);
  const [editAnimal, { isLoading: isEditingAnimal }] = useEditAnimalMutation();
  const { animal } = data || {};

  const {
    register,
    watch,
    handleSubmit,
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

  const handleDeleteImage = (imageId: string) => {
    setImagesForDelete(prev => [...prev, imageId]);
    showToast({
      title: 'Зображення видалено',
      status: 'success',
    });
  };

  const onSubmit = async (data: AnnouncementForm) => {
    if (!animal) return;
    const { images, ...otherData } = data;

    const bodyData = new FormData();
    if (images && images?.length > 0) {
      images?.forEach((image: File) => bodyData.append('images', image));
    }

    if (imagesForDelete && imagesForDelete.length > 0) {
      bodyData.append(
        'imagesToDelete',
        JSON.stringify({
          imagesForDelete,
        })
      );
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
    } catch {
      showToast({
        title: 'Щось пішло не по плану',
        description: 'Виникла помилка при редагуванні оголошення',
        status: 'error',
      });
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
    <div className="container flex flex-row gap-16 text-default-btn relative z-10">
      <div className="flex flex-col flex-1/2 mt-100 mb-100">
        <h2 className="text-[32px] mb-32 z-10">Редагування оголошення</h2>
        <form
          className="flex flex-col items-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-base mb-16 z-10">Оберіть вид тварини *</p>
          <Controller
            defaultValue={animal?.animalType}
            name="animalType"
            control={control}
            render={({ field: { onChange, name, onBlur, ref } }) => (
              <CustomRadioGroup
                items={animalTypeOptions}
                className="grid grid-cols-2"
                itemWidth="305"
                error={errors.animalType?.message}
                name={name}
                ref={ref}
                value={animalTypeValue || resolvedType}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />

          <p className="text-base mt-32 mb-16">Стать </p>
          <Controller
            defaultValue={animal?.gender}
            name="gender"
            control={control}
            render={({ field: { onChange, name, onBlur, ref } }) => (
              <CustomRadioGroup
                items={genderOption}
                className="grid grid-cols-2"
                itemWidth="305"
                error={errors.gender?.message}
                name={name}
                ref={ref}
                value={genderValue || animal?.gender}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />

          <div className="flex mt-32">
            <div className="grid grid-cols-[150px_150px] gap-[10px] mr-16">
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
                    className="w-[150px] h-[40px] mt-16 mr-10 text-base"
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
                    className="w-[150px] h-[40px] mt-16 mr-10 text-base"
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
            <div>
              <p className="text-base mb-8 text-left">Порода * </p>
              <Controller
                name="breed"
                control={control}
                render={({ field }) => (
                  <BreedSelect
                    defaultValue={animal?.breed}
                    onChange={field.onChange}
                    className="w-[305px] h-[40px]"
                    type={animalTypeValue || animal?.animalType}
                    errorMess={errors?.breed?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-[305px_305px] mt-32 gap-16">
            <InputField
              label="Ім’я тварини *"
              id="animalName"
              className="w-[305px] h-[40px] mt-16 text-base"
              labelSize="base"
              defaultValue={animal?.animalName}
              {...register('animalName')}
              error={errors.animalName?.message}
            />
            <div>
              <p className="text-base mb-8 text-left">Місто * </p>
              <Controller
                name="animalLocation"
                control={control}
                render={({ field }) => (
                  <CitySelect
                    defaultValue={animal?.animalLocation}
                    onChange={field.onChange}
                    value={animal?.animalLocation}
                    className="w-[305px] h-[40px]"
                    errorMess={errors?.animalLocation?.message}
                  />
                )}
              />
            </div>
          </div>

          <TextareaDemo
            id="announvementText"
            className="text-left mt-32 text-sm"
            placeholder="Опишіть тварину, її характер, історію, забарвлення"
            label="Опис тварини: *"
            defaultValue={animal?.adText}
            labelSize="xl"
            {...register('adText')}
            error={errors.adText?.message}
          />
          <Controller
            name="images"
            control={control}
            defaultValue={[]}
            render={({ field: { ref, name, onChange, value } }) => (
              <FilesInput
                ref={ref}
                groupLabel="Додайте фото тварини та документи *"
                labelClass="mb-16 mt-32"
                name={name}
                onChange={onChange}
                error={errors.images?.message?.toString()}
                value={value || []}
                defaultValue={animal?.animalImages}
              />
            )}
          />

          <CustomButton
            type="submit"
            styleType="defaultButton"
            disabled={isLoading || isEditingAnimal}
            className="flex gap-8 z-10 w-[259px]"
          >
            {isLoading || (isEditingAnimal && <Spinner />)}
            Зберегти зміни
          </CustomButton>
        </form>
      </div>

      <div className="flex flex-col gap-32 py-32 items-end my-100">
        <ImageCarousel
          images={animal?.animalImages || []}
          isDelete
          onDelete={handleDeleteImage}
        />
      </div>
    </div>
  );
};

export default EditAnnouncement;
