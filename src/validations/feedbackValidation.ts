import { z } from 'zod';

export const feedbackSchema = z.object({
  email: z
    .string()
    .nonempty('Email є обовʼязковим')
    .email('Невірний формат email')
    .max(50, 'Email не може перевищувати 50 символів'),
  feedback: z
    .string()
    .nonempty('Повідомлення є обовʼязковим')
    .min(5, 'Повідомлення має бути довшим'),
  checkbox: z
    .boolean({ message: 'Потрібно погодитися з умовами' })
    .refine(val => val === true, {
      message: 'Потрібно погодитися з умовами',
    }),
});
