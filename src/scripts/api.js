const baseUrl = 'https://nomoreparties.co/v1/cohort-mag-4';
const authToken = '9e39bc47-981c-4c58-9190-29c2cfc0b549';
const defaultHeaders = {
  authorization: authToken,
  'Content-Type': 'application/json'
};

const getUserData = () => {
  return fetch(`${baseUrl}/users/me`, {
    headers: defaultHeaders
  })
    .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const getCardsData = () => {
  return fetch(`${baseUrl}/cards`, {
    headers: defaultHeaders
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const changeProfileInfoAPI = (inputName, inputDescription) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: defaultHeaders,
    body: JSON.stringify({
      name: inputName,
      about: inputDescription
    })
  })
    .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
};

const sendCardToServer = (inputCardName, inputCardUrl) => {
  return fetch(`${baseUrl}/cards`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      name: inputCardName,
      link: inputCardUrl
    })
  })
    .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
};

const confirmDeleteCard = (cardId) => {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: defaultHeaders
  })
    .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
};

const sendAvatarToServer = (avatarUrl) => {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: defaultHeaders,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
    .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
};

const addLike = (cardId) => {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: defaultHeaders
  })
    .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
};

const deleteLike = (cardId) => {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: defaultHeaders
  })
    .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export {
  getUserData,
  getCardsData,
  changeProfileInfoAPI,
  sendCardToServer,
  confirmDeleteCard,
  sendAvatarToServer,
  addLike,
  deleteLike
};