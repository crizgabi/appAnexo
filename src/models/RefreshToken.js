class RefreshToken{
  constructor(id, token, login, createdAt, expiresAt) {
    this.id = id;
    this.token = token;
    this.login = login;
    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
  }
}

export default RefreshToken;