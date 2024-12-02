const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
  headers: {
    authorization: '34da56c6-c1cc-4769-9d2e-7cbe8397b0e1',
    'Content-Type': 'application/json'
  }
}

const getUserData = fetch (`${config.baseUrl}/users/me`, {
  headers: config.headers
});

const getCards = fetch (`${config.baseUrl}/cards`, {
  headers: config.headers
});

function postNewCard (createdCardName, createdCardUrl) {
  return fetch (`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: createdCardName,
      link: createdCardUrl
    })
  })
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
}

function updateProfileImg (newUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newUrl
    })
  })
};

function requestCardRemove (id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

function requestAddLike (cardId, likeCounterElement) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
}

function requestDeleteLike (cardId, likeCounterElement) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}


export { getUserData, getCards, postNewCard, updateUserData, updateProfileImg, requestCardRemove, requestAddLike, requestDeleteLike };
