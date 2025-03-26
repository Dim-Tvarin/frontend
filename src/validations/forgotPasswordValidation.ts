import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  forgotEmail: z
    .string()
    .email('Невірний формат email')
    .nonempty('Email є обовʼязковим'),
});

export const verifyResetCodeSchema = z.object({
  code: z
    .string()
    .length(6, 'Код має містити 6 цифр')
    .regex(/^\d{6}$/, 'Код має містити лише цифри')
    .nonempty('Код є обов’язковим'),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Пароль має бути щонайменше 8 символів')
      .max(30, 'Пароль має бути не більше 30 символів')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\\$%\\^&\\*])(?=.{8,128})/,
        {
          message:
            'Пароль має містити хоча б одну маленьку літеру, одну велику літеру, одну цифру і один спеціальний символ',
        }
      )
      .nonempty('Пароль є обовʼязковим'),

    repeat_password: z.string().nonempty('Повторення паролю є обовʼязковим'),
  })
  .refine(data => data.password === data.repeat_password, {
    message: 'Паролі не співпадають',
    path: ['repeat_password'],
  });
