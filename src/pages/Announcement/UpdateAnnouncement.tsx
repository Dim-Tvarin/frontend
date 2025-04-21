import { zodResolver } from "@hookform/resolvers/zod";
import BreedSelect from "components/BreedSelect";
import { CitySelect } from "components/CitySelect";
import { CustomButton } from "components/CustomButton";
import CustomRadioGroup from "components/CustomRadioGroup";
import { TextareaDemo } from "components/CustomTextarea";
import { FilesInput } from "components/FilesInput";
import FormError from "components/FormError";
import ImageCarousel from "components/ImageCarousel";
import { InputField } from "components/InputField";
import PetPageSceleton from "components/sceletons/PetPageSceleton";
import { Spinner } from "components/Spinner";
import { showToast } from "components/Toast";
import { Controller, useForm } from "react-hook-form";
import { LuCirclePlus } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import { useGetAnimalByIdQuery } from "src/redux/animals/animalsApi";
import { announceSchema } from "../../validations/announceValidation";
import type { z } from "zod";
import { animalType, gender } from "./types";

type AnnouncementForm = z.infer<typeof announceSchema>;

const UpdateAnnouncement = () => {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>()
  const {
      register,
      watch,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<AnnouncementForm>({
      resolver: zodResolver(announceSchema),
      mode: 'onChange',
    });
   const animalTypeValue = watch('animalType');
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
   console.log('data', animal, animalTypeValue);
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
            render={({ field: { onChange, name, onBlur, ref, value } }) => (
              <CustomRadioGroup
                defaultValue={animal?.animalType}
                items={animalType}
                className="grid grid-cols-2"
                itemWidth="305"
                error={errors.animalType?.message}
                name={name}
                ref={ref}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />

          <p className="text-xl mt-32 mb-16">Стать </p>
          <Controller
            name="gender"
            control={control}
            render={({ field: { onChange, name, onBlur, ref, value } }) => (
              <CustomRadioGroup
                defaultValue={animal?.gender}
                items={gender}
                className="grid grid-cols-2"
                itemWidth="305"
                error={errors.gender?.message}
                name={name}
                ref={ref}
                value={value}
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
                placeholder="0 років"
                className="w-[150px] h-[40px] mt-16"
                labelSize="xl"
                value={`${animal?.age.years} роки`}
                {...register('age.years')}
              />
              <InputField
                label=" "
                id="months"
                placeholder="0 місяців"
                className="w-[150px] h-[40px] mt-16 mr-10"
                labelSize="xl"
                value={`${animal?.age.months} місяців`}
                {...register('age.months')}
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
                    onChange={field.onChange}
                    className="w-[305px] h-[40px]"
                    type={animal?.animalType}
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
                groupLabel="Добавте фото тварини та документи *"
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
            {isLoading ? <Spinner /> : <LuCirclePlus size={20} />}
            Створити оголошення
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
