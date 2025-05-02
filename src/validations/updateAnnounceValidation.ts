import { AnimalType } from 'pages/Announcement/types';
import { z } from 'zod';

const ageSchema = z
  .object({
    years: z.preprocess(
      val => (val === '' ? undefined : Number(val)),
      z
        .number({
          invalid_type_error: 'Число повинне бути цілим',
        })
        .int()
        .min(0, 'Не валідне значення')
        .max(30, 'Максимальний вік - 30 років')
    ).optional(),
    months: z.preprocess(
      val => (val === '' ? undefined : Number(val)),
      z
        .number({
          invalid_type_error: 'Число повинне бути цілим',
        })
        .int()
        .min(0, 'Не валідне значення')
        .max(11, 'Не валідне значення')
    ).optional(),
  })
  .refine(data => (data.years ?? 0) + (data.months ?? 0) > 0, {
    message: 'Вік тварини не може бути 0 років і 0 місяців',
    path: ['months'],
  });

export const updateAnnounceSchema = z.object({
  animalType: z.nativeEnum(AnimalType).optional(),
  gender: z.enum(['male', 'female', "unknown"]).optional(),
  age: ageSchema.optional(),
  breed: z
    .string()
    .max(30, 'Порода не може перевищувати 30 символів')
    .trim()
    .optional(),
  animalName: z
    .string()
    .min(2, "Мінімум 2 символи")
    .max(50, 'Максимум 50 символів')
    .trim()
    .optional(),
  animalLocation: z
    .string()
    .min(2, 'Введіть назву населенного пункту')
    .trim()
    .optional(),
  adText: z
    .string()
    .min(50, 'Текст оголошення повинен мати мінімум 50 символів')
    .max(500, 'Текст оголошення повинен мати максимум 500 символів')
    .regex(
      /^[A-Za-zА-Яа-яЇїЄєІіҐґ0-9\s'’\-–.,!?():;"&\u{1F1E0}-\u{1F9FF}\u{2600}-\u{26FF}]+$/u,
      'Невалідний текст. Допустимі букви, цифри, пробіли, апострофи та розділові знаки.'
    )
    .trim()
    .optional(),
  images: z
    .custom<File[]>(files => !files || files.length === 0 || (files[0]?.size <= 5 * 1024 * 1024 && ['image/png', 'image/jpeg'].includes(files[0]?.type)))
    .optional(),
});
