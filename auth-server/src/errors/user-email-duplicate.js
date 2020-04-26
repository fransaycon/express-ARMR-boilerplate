class UserEmailDuplicate extends Error {
  constructor() {
    super();
    this.name = 'UserEmailDuplicate';
    this.message = 'The email entered already exists.';
    this.statusCode = 404;
  }
}

export default UserEmailDuplicate;
