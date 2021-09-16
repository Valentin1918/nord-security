import { IItem } from '~/services/getUserItems';
import itemIsOld from '../itemIsOld';


describe('should return true if password is older than 30 days', () => {
  const now = new Date();
  test.each([
    [
      false,
      {
        createdAt: now.toISOString(),
      }
    ],
    [
      false,
      {
        createdAt: new Date(new Date().setDate(now.getDate() - 29)).toISOString(),
      }
    ],
    [
      true,
      {
        createdAt: new Date(new Date().setDate(now.getDate() - 30)).toISOString(),
      }
    ],
    [
      true,
      {
        createdAt: new Date(new Date().setMonth(now.getMonth() - 1)).toISOString(),
      }
    ],
    [
      true,
      {
        createdAt: new Date(new Date().setMonth(now.getMonth() - 6)).toISOString(),
      }
    ]
  ])('should return %s', (expectedResult, item) => {
    expect(itemIsOld(item as IItem)).toBe(expectedResult);
  })
});