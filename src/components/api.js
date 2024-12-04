const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
  headers: {
    authorization: '34da56c6-c1cc-4769-9d2e-7cbe8397b0e1',
    'Content-Type': 'application/json'
  }
}

const handleResponse = res => {
  if(res.ok) {
     return res.json();
   }
  return Promise.reject(`Ошибка: ${res.status}`)
};

const getUserData =
  fetch (`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => handleResponse(res));

const getCards =
  fetch (`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => handleResponse(res));

function postNewCard (createdCardName, createdCardUrl) {
  return fetch (`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: createdCardName,
      link: createdCardUrl
    })
  })
  .then((res) => handleResponse(res))
}

function updateUserData (newName, newDescription) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription
    })
  })
  .then((res) => handleResponse(res))
}

function updateProfileImg (newUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newUrl
    })
  })
  .then((res) => handleResponse(res))
};

function requestCardRemove (id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => handleResponse(res))
}

function requestAddLike (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => handleResponse(res))
}

function requestDeleteLike (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => handleResponse(res))
}


export { getUserData, getCards, handleResponse, postNewCard, updateUserData, updateProfileImg, requestCardRemove, requestAddLike, requestDeleteLike };
