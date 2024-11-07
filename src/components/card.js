const createCard = (name, link, deleteCard, likeCard, openImgModal) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  deleteButton.addEventListener('click', deleteCard);

  likeButton.addEventListener('click', likeCard);

  cardImage.addEventListener('click', openImgModal);

  return cardElement;
};

const deleteCard = (evt) => {
  const listItem = evt.target.closest('.places__item');
  listItem.remove();
};

const likeCard = (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
      evt.target.classList.remove('card__like-button_is-active');
    } else {
      evt.target.classList.add('card__like-button_is-active')
    };
  }
};

export { createCard, deleteCard, likeCard };
