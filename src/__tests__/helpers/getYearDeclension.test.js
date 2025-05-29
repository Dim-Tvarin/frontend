import { getYearDeclension, getMonthDeclension } from 'src/helpers/getYearDeclension';
import { expect, test, describe } from 'vitest'


describe('getYearDeclension function', () => {
  test('1 year', () => {
    expect(getYearDeclension(1)).toBe('1 рік');
  });

  test('2 years', () => {
    expect(getYearDeclension(2)).toBe('2 роки');
  });

  test('3 years', () => {
    expect(getYearDeclension(3)).toBe('3 роки');
  });

  test('4 years', () => {
    expect(getYearDeclension(4)).toBe('4 роки');
  });

  test('5 years', () => {
    expect(getYearDeclension(5)).toBe('5 років');
  });
});


describe('getMonthDeclension function', () => {
  test('1 month', () => {
    expect(getMonthDeclension(1)).toBe('1 місяць');
  });

  test('2 month', () => {
    expect(getMonthDeclension(2)).toBe('2 місяці');
  });

  test('3 month', () => {
    expect(getMonthDeclension(3)).toBe('3 місяці');
  });

  test('4 month', () => {
    expect(getMonthDeclension(4)).toBe('4 місяці');
  });

  test('5 month', () => {
    expect(getMonthDeclension(5)).toBe('5 місяців');
  });
});