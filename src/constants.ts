export enum Routes {
  Login = '/login',
  PasswordHealth = '/items',
  Secured = '/items/secured',
  Vulnerable = '/items/vulnerable',
  Weak = '/items/weak',
  Reused = '/items/reused',
  Old = '/items/old',
  Root = '/',
}

export enum API {
  Login = 'api/login',
  Logout = 'api/logout',
  Items = 'api/items',
  User = 'api/user',
}

export const unknownErrorMessage = 'Something wend wrong!';
