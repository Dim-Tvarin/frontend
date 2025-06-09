import type { AnimalType } from 'pages/Announcement/types';

export const mapAnimalType: Record<AnimalType, string> = {
  cats: 'Кіт',
  dogs: 'Собаки',
  birds: 'Птах',
  other: 'Інша тварина',
};

export const mapGender = {
  male: 'Хлопчик',
  female: 'Дівчинка',
};

export const getActiveFilters = (filters: Record<string, string>) => {
  const activeFilters: { key: string; value: string }[] = [];

  Object.entries(filters).forEach(([key, value]) => {
    const item = { key: key, value: value };

    if (key === 'animalType') {
      item.value = mapAnimalType[value as AnimalType];
    }
    if (key === 'gender') {
      item.value = mapGender[value as keyof typeof mapGender];
    }

    activeFilters.push(item);
  });

  return activeFilters;
};
