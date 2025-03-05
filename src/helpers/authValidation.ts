import { z } from 'zod';

export const registrationSchema = z
    .object({
        name: z
            .string()
            .min(3, 'Імʼя повинно містити щонайменше 3 символи')
            .max(30, 'Імʼя не може перевищувати 30 символів')
            .trim()
            .nonempty('Імʼя є обовʼязковим'),

        surname: z
            .string()
            .min(3, 'Прізвище повинно містити щонайменше 3 символи')
            .max(30, 'Прізвище не може перевищувати 30 символів')
            .trim()
            .nonempty('Прізвище є обовʼязковим'),

        email: z
            .string()
            .email('Невірний формат email')
            .nonempty('Email є обовʼязковим'),

        location: z
            .string()
            .min(2, 'Введіть місто')
            .nonempty('Місто є обовʼязковим')
            .trim(),

        phone: z
            .string()
            .regex(/^(\+?38)?0\d{9}$/, 'Невірний формат телефону')
            .nonempty('Телефон є обовʼязковим'),

        password: z
            .string()
            .min(8, 'Пароль має бути щонайменше 8 символів')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\\$%\\^&\\*])(?=.{8,128})/,
                {
                    message:
                        'Пароль має містити хоча б одну маленьку літеру, одну велику літеру, одну цифру і один спеціальний символ',
                }
            )
            .nonempty('Пароль є обовʼязковим'),

        confirmPassword: z
            .string()
            .nonempty('Повторення паролю є обовʼязковим'),

        userType: z.enum(['Опікун', 'Усиновлювач', ''], {
            errorMap: () => {
                return { message: 'Тип користувача є обовʼязковим' };
            },
        }),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Паролі не співпадають',
        path: ['confirmPassword'],
    });

export const loginSchema = z.object({
    email: z
        .string()
        .email('Невірний формат email')
        .nonempty('Email є обовʼязковим'),

    password: z
        .string()
        .min(8, 'Пароль має бути щонайменше 8 символів')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\\$%\\^&\\*])(?=.{8,128})/,
            {
                message:
                    'Пароль має містити хоча б одну маленьку літеру, одну велику літеру, одну цифру і один спеціальний символ',
            }
        )
        .nonempty('Пароль є обовʼязковим'),
});
