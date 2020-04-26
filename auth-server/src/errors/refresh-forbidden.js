class RefreshForbidden extends Error {
  constructor() {
    super();
    this.name = "RefreshForbidden";
    this.message = "Refresh is forbidden. Invalid cookies.";
    this.statusCode = 403;
  }
}

export default RefreshForbidden;
