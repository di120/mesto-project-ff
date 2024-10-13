const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');

const createCard = (name, link, deleteCard) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
};

const deleteCard = (evt) => {
  const listItem = evt.target.closest('.places__item');
  listItem.remove();
};

initialCards.forEach(function (card) {
  const createdCard = createCard(card.name, card.link, deleteCard);
  cardsContainer.append(createdCard);
});
