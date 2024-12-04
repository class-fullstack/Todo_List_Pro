class AuthService {
  async login() {
    return {
      message: "Login successful",
    };
  }
}

module.exports = new AuthService();
