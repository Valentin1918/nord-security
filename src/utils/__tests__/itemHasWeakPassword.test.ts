import itemHasWeakPassword from '../itemHasWeakPassword';
import { IItem } from '../../services/getUserItems';

// Todo fix problem that causes this test to fail
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