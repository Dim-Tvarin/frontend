import { z } from 'zod';

export const announceSchema = z.object({
  animalType: z.enum(['cat', 'dog', 'bird', 'another'], {
    errorMap: () => {
      return { message: 'Оберіть вид тварини' };
    },
  }),
  gender: z.enum(['male', 'female', 'unknown']),
  age: z.coerce
    .string()
    .regex(/^\d+$/, 'Введіть ціле число')
    .nonempty('Введіть вік тварини')
    .trim(),
  breed: z
    .string()
    .nonempty('Введіть назву породи або "НЕВІДОМО"')
    .max(30, 'Порода не може перевищувати 30 символів')
    .trim(),
  animalName: z.string().nonempty("Введіть ім'я тварини").trim(),
  animalLocation: z.string().min(2, 'Введіть назву населенного пункту').trim(),
  adText: z
    .string()
    .min(10, 'Текст оголошення повинен мати мінімум 10 символів')
    .max(500, 'Текст оголошення повинен мати максимум 500 символів')
    .nonempty("Поле обов'язкове")
    .trim(),
  images: z
    .any()
    .refine((file: File[]) => file?.length !== 0, 'Додайте фото')
    .refine(file => !file || file.size !== 0 || file.size <= 2000000, {
      message: 'Максимальний розмір файлу не повинен перевищувати 2 МБ',
    }),
});
