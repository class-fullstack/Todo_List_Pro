class UserEntities {
  constructor({
    userId,
    username,
    email,
    passwordHash,
    isDeleted,
    createdAt,
    updatedAt,
  }) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = UserEntities;
