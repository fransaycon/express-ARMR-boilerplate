class UserForbidden extends Error {
  constructor() {
    super();
    this.name = "UserForbidden";
    this.message = "User is forbidden to access this.";
    this.statusCode = 403;
  }
}

export default UserForbidden;
