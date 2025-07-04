import { z } from 'zod';

export const editUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Імʼя повинно містити щонайменше 2 символи')
    .max(50, 'Імʼя не може перевищувати 50 символів')
    .trim()
    .regex(
      /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ' -]+$/,
      'Імʼя може містити лише літери, дефіси, апострофи та пробіли'
    )
    .nonempty('Імʼя є обовʼязковим'),

  email: z
    .string()
    .trim()
    .email('Невірний формат email')
    .max(50, 'Email не може перевищувати 50 символів')
    .nonempty('Email є обовʼязковим')
    .transform(s => s.toLowerCase()),

  location: z
    .string()
    .min(2, 'Введіть місто')
    .max(50, 'Місто не може перевищувати 50 символів')
    .nonempty('Місто є обовʼязковим')
    .trim(),

  phone: z
    .string()
    .regex(/^(\+?38)?0\d{9}$/, 'Невірний формат телефону')
    .nonempty('Телефон є обовʼязковим'),
});

export const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Пароль має бути щонайменше 8 символів латиницею')
      .max(30, 'Пароль не може перевищувати 30 символів')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\\$%\\^&\\*])(?=.{8,128})/,
        {
          message:
            'Пароль має містити хоча б одну маленьку літеру, одну велику літеру, одну цифру і один спеціальний символ',
        }
      )
      .nonempty('Пароль є обовʼязковим'),

    repeat_newPassword: z
      .string()
      .nonempty('Повторення паролю є обовʼязковим')
      .min(8, 'Пароль має бути щонайменше 8 символів латиницею')
      .max(30, 'Пароль не може перевищувати 30 символів'),
  })
  .refine(data => data.newPassword === data.repeat_newPassword, {
    message: 'Паролі не співпадають',
    path: ['repeat_newPassword'],
  });
