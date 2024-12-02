import { requestAddLike, requestDeleteLike, requestCardRemove } from './api';
import { openModal, closeModal } from './modal';

const createCard = ([name, link, cardId, cardOwnerId, likesNumber, userId, deleteCard, deleteImgModal, likeCard, openImgModal]) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  likeCounter.textContent = likesNumber;

  deleteButton.addEventListener('click', (evt) => {
    deleteCard(evt, deleteImgModal, cardId, cardOwnerId, userId);
  });

  likeButton.addEventListener('click', (evt) => {
    likeCard(evt, cardId, likeCounter);
  });

  cardImage.addEventListener('click', openImgModal);

  return cardElement;
};

const deleteCard = (evt, deleteImgModal, cardId, cardOwnerId, userId) => {
  const cardItem = evt.target.closest('.places__item');
  const deleteModalBtn = deleteImgModal.querySelector('.popup__button');
  openModal(deleteImgModal);
  deleteModalBtn.addEventListener('click', () => {
    requestCardRemove(cardId)
      .then((res) => {
        if(res.ok) {
          if (cardOwnerId === userId) {
            cardItem.remove();
          }
          return;
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeModal(deleteImgModal);
      })
  })
};

const likeCard = (evt, cardId, likeCounterElement) => {
  if (evt.target.classList.contains('card__like-button')) {
    const targetLikeBtn = evt.target;
    if (targetLikeBtn.classList.contains('card__like-button_is-active')) {
      requestDeleteLike(cardId, likeCounterElement)
        .then((res) => {
          if(res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
          likeCounterElement.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          targetLikeBtn.classList.remove('card__like-button_is-active');
        })
    } else {
      requestAddLike(cardId, likeCounterElement)
        .then((res) => {
          if(res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
          likeCounterElement.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          targetLikeBtn.classList.add('card__like-button_is-active');
        })
    };
  }
};

export { createCard, deleteCard, likeCard };
