 export const getYearDeclension = (num: number) => {
  if (num === 1) return `${num} рік`;
  if (num >= 2 && num <= 4) return `${num} роки`;
  return `${num} років`;
};

export const getMonthDeclension = (num: number): string => {
  if (num === 1) return `${num} місяць`;
  if (num >= 2 && num <= 4) return `${num} місяці`;
  return `${num} місяців`;
};