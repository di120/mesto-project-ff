import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

const content = document.querySelector('.content');
const profileTitle = content.querySelector('.profile__title');
const profileDescription = content.querySelector('.profile__description');
const cardsContainer = content.querySelector('.places__list');
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const closeBtns = document.querySelectorAll('.popup__close');
const popupEdit = document.querySelector('.popup_type_edit');
const editForm = popupEdit.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = popupNewCard.querySelector('.popup__form');
const newCardName = newCardForm.querySelector('.popup__input_type_card-name');
const newCardLink = newCardForm.querySelector('.popup__input_type_url');
const popupImg = document.querySelector('.popup_type_image');
const popupImgPicture = popupImg.querySelector('.popup__image');
const popupImgText = popupImg.querySelector('.popup__caption');


const openImgModal = (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const cardTitle = evt.target.closest('.places__item').querySelector('.card__title');
    popupImgPicture.src = evt.target.src;
    popupImgPicture.alt = evt.target.alt;
    popupImgText.textContent = cardTitle.textContent;
    openModal(popupImg);
  }
};

function handleEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
};

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(newCardName.value, newCardLink.value, deleteCard, likeCard, openImgModal);
  cardsContainer.prepend(newCard);
  closeModal(popupNewCard);
  newCardName.value = '';
  newCardLink.value = '';
};

initialCards.forEach(function (card) {
  const createdCard = createCard(card.name, card.link, deleteCard, likeCard, openImgModal);
  cardsContainer.append(createdCard);
});

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

editButton.addEventListener('click', () => {
  openModal(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

editForm.addEventListener('submit', handleEditSubmit);

addButton.addEventListener('click', () => openModal(popupNewCard));

newCardForm.addEventListener('submit', handleNewCardSubmit);

closeBtns.forEach(function (closeBtn) {
  closeBtn.addEventListener('click', () => closeModal(closeBtn.closest('.popup')))
});
