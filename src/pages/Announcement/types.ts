export const animalTypeOptions = [
  {
    value: 'cats',
    label: 'Кіт',
  },
  {
    value: 'dogs',
    label: 'Собака',
  },
  {
    value: 'birds',
    label: 'Птах',
  },
  {
    value: 'other',
    label: 'Інша тварина',
  },
];

export const genderOption = [
  {
    value: 'male',
    label: 'Хлопчик',
  },
  {
    value: 'female',
    label: 'Дівчинка',
  }
];

export const ageOption = [
  {
    value: 'до 1 року',
    label: 'до 1 року',
  },
  {
    value: '1-3 роки',
    label: '1-3 роки',
  },
   {
    value: '3-5 років',
    label: '3-5 років',
  },
   {
    value: 'Старше 5 років',
    label: 'Старше 5 років',
  },
];

export const size = [
  {
    value: 'Малий',
    label: 'маленький',
  },
  {
    value: 'Середній',
    label: 'середній',
  },
    {
    value: 'Великий',
    label: 'великий',
  }
];


export const AnimalTypeEnum = {
  cats: "cats",
  dogs: "dogs",
  birds: "birds",
  other: "other",
} as const

export type AnimalTypeEnum = (typeof AnimalTypeEnum)[keyof typeof AnimalTypeEnum]

export enum AnimalType {
  cats = "cats",
  dogs = "dogs",
  birds = "birds",
  other = "other",
}
