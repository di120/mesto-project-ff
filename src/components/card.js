import { requestAddLike, requestDeleteLike, requestCardRemove } from './api';
import { openModal, closeModal } from './modal';
import { popupDeleteImg } from '../index';

const createCard = (data, currentUserId, deleteCard, likeCard, openImgModal) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardElement.querySelector('.card__title').textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  likeCounter.textContent = data.likes.length;

  if(data.owner._id !== currentUserId) {
    deleteButton.remove();
  }

  if (data.likes.some((like) => like._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  deleteButton.addEventListener('click', (evt) => {
    deleteCard(evt, data._id);
  });

  likeButton.addEventListener('click', (evt) => {
    likeCard(evt, data._id, likeCounter);
  });

  cardImage.addEventListener('click', openImgModal);

  return cardElement;
};

const deleteCard = (evt, cardId) => {
  const cardItem = evt.target.closest('.places__item');
  const deleteModalBtn = popupDeleteImg.querySelector('.popup__button');
  openModal(popupDeleteImg);
  deleteModalBtn.onclick = () => {
    requestCardRemove(cardId)
      .then(() => {
        cardItem.remove();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeModal(popupDeleteImg);
      })
  }
};

const likeCard = (evt, cardId, likeCounterElement) => {
  if (evt.target.classList.contains('card__like-button')) {
    const targetLikeBtn = evt.target;
    const likeMethod = targetLikeBtn.classList.contains('card__like-button_is-active') ? requestDeleteLike(cardId) : requestAddLike(cardId);
    likeMethod
      .then((data) => {
        likeCounterElement.textContent = data.likes.length;
        targetLikeBtn.classList.toggle("card__like-button_is-active");
      })
      .catch(err => console.log(err));
  }
};

export { createCard, deleteCard, likeCard };
