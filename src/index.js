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
const popupEdit = document.querySelector('.popup_type_edit');
const editForm = popupEdit.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = popupNewCard.querySelector('.popup__form');
const closeBtns = document.querySelectorAll('.popup__close');


const openImgModal = (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const imgPopup = document.querySelector('.popup_type_image');
    const popupImg = imgPopup.querySelector('.popup__image');
    const popupText = imgPopup.querySelector('.popup__caption');
    const cardTitle = evt.target.closest('.places__item').querySelector('.card__title');
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupText.textContent = cardTitle.textContent;
    openModal('.popup_type_image');
  }
};

function handleEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal();
};

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const newCardName = newCardForm.querySelector('.popup__input_type_card-name');
  const newCardLink = newCardForm.querySelector('.popup__input_type_url');
  const newCard = createCard(newCardName.value, newCardLink.value, deleteCard, likeCard, openImgModal);
  cardsContainer.prepend(newCard);
  closeModal();
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
  openModal('.popup_type_edit');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

editForm.addEventListener('submit', handleEditSubmit);

addButton.addEventListener('click', () => openModal('.popup_type_new-card'));

newCardForm.addEventListener('submit', handleNewCardSubmit);

closeBtns.forEach(function (closeBtn) {
  closeBtn.addEventListener('click', closeModal)
});

export { cardsContainer };
