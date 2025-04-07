import { z } from 'zod';

const ageSchema = z.object({
  years: z.coerce.number({ required_error: "Введіть вік тврини", invalid_type_error: "Число повинне бути цілим" }).int().min(0, 'Не валідне значення').max(30, "Максимальний вік - 30 років"),
  months: z.coerce.number({ invalid_type_error: "Число повинне бути цілим" }).int().min(0, 'Не валідне значення').max(11, 'Не валідне значення').default(0),
});


export const announceSchema = z.object({
  animalType: z.enum(['cat', 'dog', 'bird', 'another'], {
    errorMap: () => {
      return { message: 'Оберіть вид тварини' };
    },
  }),
  gender: z.enum(['male', 'female']).optional(),
  age: ageSchema,

  breed: z
    .string()
    .nonempty('Введіть назву породи або "НЕВІДОМО"')
    .max(30, 'Порода не може перевищувати 30 символів')
    .trim(),
  animalName: z.string().min(2, "Мінімум 2 символи").max(50, 'Максимум 50 символів').nonempty("Введіть ім'я тварини").trim(),
  animalLocation: z.string().min(2, 'Введіть назву населенного пункту').trim(),
  adText: z
    .string()
    .min(50, 'Текст оголошення повинен мати мінімум 50 символів')
    .max(500, 'Текст оголошення повинен мати максимум 500 символів')
    .regex(
    /^(?!.* {2,})[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9.,!?()\-:;'"]+(\s[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9.,!?()\-:;'"]+)*$/,
    'Невалідний текст. Допустимі букви, цифри, пробіли, апострофи та розділові знаки.')
    .nonempty("Поле обов'язкове")
    .trim(),
  images: z
    .custom<File[]>(
      files => {
        return files && files.length > 0;
      },
      { message: 'Додайте фото' }
    )
    .refine(files => files[0]?.size <= 5 * 1024 * 1024, {
      message: 'Файл повинен бути менше 5MB',
    })
    .refine(files => ['image/png', 'image/jpeg'].includes(files[0]?.type), {
      message: 'Тільки PNG/JPEG',
    }),
});
