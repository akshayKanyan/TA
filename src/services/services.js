export const userService = {
  login,
  logout,
  getAllUsers,
  createUser,
  verifyToken
};

const config = {
  apiUrl: "https://api.prontoitlabs.com/api/v1"
};

function login(userName, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ userName, password })
  };

  return fetch(`${config.apiUrl}/user/login`, requestOptions).then(res => res.json()).then(user => {
    if (user) {
      if (user.errorMessage) {
        return Promise.reject(user.errorMessage);
      } else {
        localStorage.setItem("token", user.data && user.data.token);
      }
    }
    return user;
  });
}

function createUser(userName, password, gender) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ userName, password, gender })
  };

  return fetch(`${config.apiUrl}/user`, requestOptions).then(res => res.json()).then(user => {
    if (user && user.error) {
      return Promise.reject(user.error);
    }
    return user;
  });
}

function logout() {
  localStorage.removeItem("token");
}

function authHeader() {
  let token = localStorage.getItem("token");
  return { "X-AUTH-TOKEN": token };
}

function getAllUsers(page = 0) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/user?page=${page}&size=25`, requestOptions).then(_ => _.json()).then(users => {
    return users;
  });
}

function verifyToken(page = 0) {
  const requestOptions = {
    method: "POST",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/user/verify-token`, requestOptions).then(_ => _.json()).then(data => {
    return data;
  });
}
