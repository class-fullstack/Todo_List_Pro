class AuthEntities {
  constructor({ userId, email, accessToken = null, includeToken = false }) {
    this.userId = userId;
    this.email = email;
    if (accessToken) {
      this.accessToken = accessToken;
    }
  }
}

module.exports = AuthEntities;
