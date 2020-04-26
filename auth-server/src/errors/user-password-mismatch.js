class UserPasswordMismatch extends Error {
  constructor() {
    super();
    this.name = "UserPasswordMismatch";
    this.message = "The password entered did not match.";
    this.statusCode = 403;
  }
}

export default UserPasswordMismatch;
