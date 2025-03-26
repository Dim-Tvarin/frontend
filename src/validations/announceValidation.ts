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
    .custom<File[]>(
      files => {
        console.log('fi', files);
        return files && files.length > 0;
      },
      { message: 'Додайте фото' }
    )
    .refine(files => files[0]?.size <= 2 * 1024 * 1024, {
      message: 'Файл повинен бути менше 5MB',
    })
    .refine(files => ['image/png', 'image/jpeg'].includes(files[0]?.type), {
      message: 'Тільки PNG/JPEG',
    }),
});
