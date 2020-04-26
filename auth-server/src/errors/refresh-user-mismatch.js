class RefreshUserMismatch extends Error {
  constructor() {
    super();
    this.name = "RefreshUserMismatch";
    this.message = "Authorization user does not match refresh user.";
    this.statusCode = 403;
  }
}

export default RefreshUserMismatch;
