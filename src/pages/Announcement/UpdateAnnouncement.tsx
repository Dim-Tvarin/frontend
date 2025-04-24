import { zodResolver } from "@hookform/resolvers/zod";
import BreedSelect from "components/BreedSelect";
import { CitySelect } from "components/CitySelect";
import { CustomButton } from "components/CustomButton";
import CustomRadioGroup from "components/CustomRadioGroup";
import { TextareaDemo } from "components/CustomTextarea";
import FormError from "components/FormError";
import ImageCarousel from "components/ImageCarousel";
import { InputField } from "components/InputField";
import PetPageSceleton from "components/sceletons/PetPageSceleton";
import { Spinner } from "components/Spinner";
import { showToast } from "components/Toast";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useGetAnimalByIdQuery } from "src/redux/animals/animalsApi";
import { announceSchema } from "../../validations/announceValidation";
import type { z } from "zod";
import { animalTypeOptions, genderOption, type AnimalTypeValues } from "./types";
import { getMonthDeclension, getYearDeclension } from "src/helpers/getYearDeclension";
import { FilesInput } from "components/FilesInput";

type AnnouncementForm = z.infer<typeof announceSchema>;

const UpdateAnnouncement = () => {
  
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>()
   if (!id ) {
    showToast({
      title: 'Щось пішло не по плану',
      description: 'Це оголошення не було знайдено',
      status: 'error',
    });
    setTimeout(() => navigate(`/allpets/${id}`), 1000);
    return;
  }
  const { data, error, isLoading } = useGetAnimalByIdQuery(id);
  const { animal } = data || {}
  const {
      register,
      watch,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<AnnouncementForm>({
      resolver: zodResolver(announceSchema),
      mode: 'onChange',
      defaultValues: {
        animalType: animal?.animalType,
        gender: animal?.gender ?? undefined,
      }
    });
   const animalTypeValue = watch('animalType');
   const genderValue = watch('gender');
   const years = watch('age.years');
   const months = watch('age.months');

 console.log('в', animal);

  if (isLoading) {
    return <PetPageSceleton />;
  }
  if (error) {
      showToast({
        title: 'Щось пішло не по плану',
        description: 'Виникла помилка при завантаженні даних',
        status: 'error',
      })
      setTimeout(() => navigate('/allpets'), 1000)
      return
    } 
  const onSubmit = async (data: AnnouncementForm) => {
    console.log('dataForm', data);
  }

  const defaultTypes: AnimalTypeValues[] = ['cats', 'dogs', 'birds'];
  const resolvedType:  AnimalTypeValues = defaultTypes.includes(animal?.animalType as AnimalTypeValues)
  ? animal?.animalType as AnimalTypeValues
  : 'other';
console.log('err', errors);
  return (
    <div className="container flex flex-row gap-16 text-default-btn relative z-10">
      <div className="flex flex-col flex-1/2 mt-100">
        <h2 className="text-[32px] mb-32 z-10">Редагування оголошення</h2>
        <form
          className="flex flex-col items-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-xl mb-16 z-10">Оберіть вид тварини *</p>
          <Controller
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

          <p className="text-xl mt-32 mb-16">Стать </p>
          <Controller
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
              <InputField
                label="Вік"
                id="years"
                placeholder={`${getYearDeclension(animal?.age.years || 0)}`}
                className="w-[150px] h-[40px] mt-16"
                labelSize="xl"
                defaultValue={getYearDeclension(animal?.age.years || 0)}
                {...register('age.years')}
                onFocus={e => {
                  e.target.value = `${animal?.age.years || 0}`;
                }}
                onBlur={e => {
                  e.target.value = `${getYearDeclension(years || 0)}`;
                }}
              />
              <InputField
                label=" "
                id="months"
                placeholder={`${getMonthDeclension(animal?.age.months || 0)}`}
                className="w-[150px] h-[40px] mt-16 mr-10"
                labelSize="xl"
                {...register('age.months')}
                defaultValue={getMonthDeclension(animal?.age.months || 0)}
                onFocus={e => {
                  e.target.value = `${animal?.age.months || 0}`;
                }}
                onBlur={e => {
                  e.target.value = `${getMonthDeclension(months || 0)}`;
                }}
              />
              {errors.age?.months?.message && (
                <FormError error={errors.age?.months?.message} />
              )}
              {errors.age?.years?.message && (
                <FormError error={errors.age?.years?.message} />
              )}
            </div>
            <div>
              <p className="text-xl mb-8 text-left">Порода * </p>
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
              className="w-[305px] h-[40px] mt-16"
              labelSize="xl"
              defaultValue={animal?.animalName}
              {...register('animalName')}
              error={errors.animalName?.message}
            />
            <div>
              <p className="text-xl mb-8 text-left">Місто * </p>
              <Controller
                name="animalLocation"
                control={control}
                render={({ field }) => (
                  <CitySelect
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
            className="text-left mt-32"
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
                value={value}
              />
            )}
          />

          <CustomButton
            type="submit"
            styleType="defaultButton"
            disabled={isLoading}
            className="flex gap-8 z-10 w-[259px]"
          >
            {isLoading && <Spinner />}
            Зберегти зміни
          </CustomButton>
        </form>
      </div>

      <div className=" bg-orange rounded-[30px] flex flex-col gap-32 py-32 items-end my-100">
        {/* <div className="w-[600px] rounded-l-[30px] overflow-hidden ml-30">
            <img src={announce4} alt="хлопець з лабродором" />
          </div> */}
        <ImageCarousel images={animal?.animalImages || []} />
      </div>
    </div>
  );
}

export default UpdateAnnouncement;
