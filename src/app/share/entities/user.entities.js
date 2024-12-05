class User {
  constructor({ userId, username, email, passwordHash, isDeleted, createdAt }) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt;
  }
}

module.exports = User;
