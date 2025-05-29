import { getYearDeclension } from 'src/helpers/getYearDeclension';
import { expect, test, describe } from 'vitest'


describe('getYearDeclension function', () => {
  test('1 year', () => {
    expect(getYearDeclension(1)).toBe('1 рік');
  });
});
