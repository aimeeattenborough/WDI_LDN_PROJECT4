// has the same functions as $auth on angular - helper functions

class Auth {

  static logout() {
    localStorage.removeItem('token');
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static getToken() {
    // check for a token
    return localStorage.getItem('token');
  }

  static getPayload() {
    const token = this.getToken();
    if(!token) return false;

    // check if its a valid jwt token
    const parts = token.split('.');
    if(parts.length < 3) return false;

    return JSON.parse(atob(parts[1]));
  }

  static isAuthenticated() {
    // check it has an expiry
    const payload = this.getPayload();
    if(!payload || !payload.exp) return false;
    // check that it hasn't expired
    const now = Math.round(Date.now() / 1000);

    return now < payload.exp;

  }
}

export default Auth;
