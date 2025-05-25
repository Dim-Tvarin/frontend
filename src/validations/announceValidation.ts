import { AnimalType } from 'pages/Announcement/types';
import { z } from 'zod';

const ageSchema = z
  .object({
    years: z.preprocess(
      val => (val === '' ? undefined : Number(val)),
      z
        .number({
          required_error: 'Введіть вік тварини',
          invalid_type_error: 'Число повинне бути цілим',
        })
        .int()
        .min(0, 'Не валідне значення')
        .max(30, 'Максимальний вік - 30 років')
    ),
    months: z.preprocess(
      val => (val === '' ? undefined : Number(val)),
      z
        .number({
          required_error: '',
          invalid_type_error: 'Число повинне бути цілим',
        })
        .int()
        .min(0, 'Не валідне значення')
        .max(11, 'Не валідне значення')
    ),
  })
  .refine(data => (data.years ?? 0) + (data.months ?? 0) > 0, {
    message: 'Вік тварини не може бути 0 років і 0 місяців',
    path: ['months'],
  });

export const announceSchema = z.object({
  animalType: z.nativeEnum(AnimalType, {
    required_error: 'Оберіть вид тварини',
  }),
  gender: z.enum(['male', 'female', 'unknown']).optional(),
  age: ageSchema,
  breed: z
    .string({ required_error: 'Спочатку оберіть вид тварини, а потім породу' })
    .max(50, 'Порода не може перевищувати 50 символів')
    .trim(),
  animalName: z
    .string()
    .min(2, 'Мінімум 2 символи')
    .max(50, 'Максимум 50 символів')
    .nonempty("Введіть ім'я тварини")
    .trim(),
  animalLocation: z
    .string({ required_error: 'Оберіть населенний пункт' })
    .min(2, 'Введіть назву населенного пункту')
    .trim(),
  adText: z
    .string()
    .min(50, 'Текст оголошення повинен мати мінімум 50 символів')
    .max(500, 'Текст оголошення повинен мати максимум 500 символів')
    .regex(
      /^[A-Za-zА-Яа-яЇїЄєІіҐґ0-9\s'’\-–.,!?():;"&\u{1F1E0}-\u{1F9FF}\u{2600}-\u{26FF}]+$/u,
      'Невалідний текст. Допустимі букви, цифри, пробіли, апострофи та розділові знаки.'
    )
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
