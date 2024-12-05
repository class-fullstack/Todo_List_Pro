class AuthEntities {
  constructor({ userId, email, accessToken }) {
    this.userId = userId;
    this.email = email;
    this.accessToken = accessToken;
  }
}

module.exports = AuthEntities;
