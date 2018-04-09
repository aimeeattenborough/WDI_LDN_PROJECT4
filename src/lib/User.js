class User {
// singleton allowing access to the user in other files
// using localstorage to store the current user. Would be [object Object] if not stringified.
  static setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
//  getting user out of localstorage and parsing it. if there is not one in local storage return false
  static getUser() {
    const user = localStorage.getItem('user');
    if(user) return JSON.parse(user);
    return false;
  }

  static clearUser() {
    localStorage.removeItem('user');
  }
}

export default User;
