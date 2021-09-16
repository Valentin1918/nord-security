import itemHasReusedPassword from '../itemHasReusedPassword';

const items = [
   {
      "id": "000",
      "title": "discord",
      "description": "rumors",
      "password": "discordPassword123.",
      "createdAt": null
   },
   {
      "id": "001",
      "title": "airdroid",
      "description": "replace android",
      "password": "pass1",
      "createdAt": null
   },
   {
      "id": "010",
      "title": "Nintendo",
      "description": "Lets play",
      "password": "pass1",
      "createdAt": null
   }
]

test('should return true if there is more than one item with same password', () => {
   expect(itemHasReusedPassword(items[0], items)).toBe(false);
   expect(itemHasReusedPassword(items[2], items)).toBe(true);
});