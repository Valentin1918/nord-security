import { IItem } from '~/services/getUserItems';
import itemHasWeakPassword from '../itemHasWeakPassword';


describe('should return true if password do not match requirements', () => {
  test.each([
    [
      true,
      {
        password: 'pass',
      }
    ],
    [
      false,
      {
        password: 'Password123~',
      }
    ],
    [
      true,
      {
        password: 'Password',
      }
    ]
  ])('should return %s', (expectedResult, item) => {
    expect(itemHasWeakPassword(item as IItem)).toBe(expectedResult);
  })
});