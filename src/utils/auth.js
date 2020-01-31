export default class Auth {
  static setToken(token) {
    localStorage.setItem('authToken', token);
  }

  static setId(token) {
    localStorage.setItem('id', token);
  }

  static setUser(user) {
    localStorage.setItem('user', user);
  }

  static destroyToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('id');
    localStorage.removeItem('user');
  }

  static getUser() {
    var user = localStorage.getItem('user');
    if (!user) return null;
    return user;
  }

  static getId() {
    var role = localStorage.getItem('id');
    if (!role) return null;
    return role;
  }

  static getToken() {
    var token = localStorage.getItem('authToken');
    if (!token) return null;
    return token;
  }

  static loggedIn() {
    return !!this.getToken();
  }
}
