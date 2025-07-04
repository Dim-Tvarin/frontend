import { z } from 'zod';

export const feedbackSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty('Email є обовʼязковим')
    .email('Невірний формат email')
    .max(50, 'Email не може перевищувати 50 символів')
    .transform(s => s.toLowerCase()),
  feedback: z
    .string()
    .nonempty('Повідомлення є обовʼязковим')
    .min(10, 'Текст повідомлення повинен бути від 10 до 1000 символів')
    .max(1000, 'Текст повідомлення не може перевищувати 1000 символів'),
  checkbox: z
    .boolean({ message: 'Потрібно погодитися з умовами' })
    .refine(val => val === true, {
      message: 'Потрібно погодитися з умовами',
    }),
});
