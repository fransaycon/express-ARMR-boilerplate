class RefreshAuthorizationEmpty extends Error {
  constructor() {
    super();
    this.name = "RefreshAuthorizationEmpty";
    this.message = "Authorization cookie does not exist. Cannot refresh.";
    this.statusCode = 403;
  }
}

export default RefreshAuthorizationEmpty;
