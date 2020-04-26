class UserMaxLoginTries extends Error {
  constructor() {
    super();
    this.name = 'UserMaxLoginTries';
    this.message = 'User reached maximum login tries.';
    this.statusCode = 403;
  }
}

export default UserMaxLoginTries;
