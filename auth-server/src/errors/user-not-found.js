class UserNotFound extends Error {
  constructor() {
    super();
    this.name = 'UserNotFound';
    this.message = 'No user exists with the given context.';
    this.statusCode = 403;
  }
}

export default UserNotFound;
