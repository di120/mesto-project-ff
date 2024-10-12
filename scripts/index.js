const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');

const createCard = (name, link, deleteCard) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;

    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
};

const deleteCard = (evt) => {
  const listItem = evt.target.closest('.places__item');
  listItem.remove();
};

initialCards.forEach(function (card) {
  const createdCard = createCard(card.name, card.link, deleteCard);
  cardList.append(createdCard);
});
