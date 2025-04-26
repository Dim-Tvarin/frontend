function cleanObject<T extends object>(obj: T): Partial<T> {
  const cleanedEntries = Object.entries(obj)
    .filter(([, value]) => {
      if (value === null || value === undefined) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;
      if (typeof value === 'object' && !Array.isArray(value)) {
        // Рекурсивная очистка вложенных объектов
        const cleanedNested = cleanObject(value);
        return Object.keys(cleanedNested).length > 0;
      }
      return true;
    })
    .map(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        return [key, cleanObject(value)];
      }
      return [key, value];
    });

  return Object.fromEntries(cleanedEntries);
}

export default cleanObject;