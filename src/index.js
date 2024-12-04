import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserData, getCards, handleResponse, postNewCard, updateUserData, updateProfileImg, requestCardRemove } from './components/api.js';

const content = document.querySelector('.content');
const profileTitle = content.querySelector('.profile__title');
const profileDescription = content.querySelector('.profile__description');
const profileImg = content.querySelector('.profile__image');
const cardsContainer = content.querySelector('.places__list');
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const closeBtns = document.querySelectorAll('.popup__close');
const popupEdit = document.querySelector('.popup_type_edit');
const editForm = popupEdit.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');
const editFormBtn = editForm.querySelector('.popup__button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = popupNewCard.querySelector('.popup__form');
const newCardName = newCardForm.querySelector('.popup__input_type_card-name');
const newCardLink = newCardForm.querySelector('.popup__input_type_url');
const newCardFormBtn = newCardForm.querySelector('.popup__button');
const popupImg = document.querySelector('.popup_type_image');
const popupImgPicture = popupImg.querySelector('.popup__image');
const popupImgText = popupImg.querySelector('.popup__caption');
const popupDeleteImg = document.querySelector('.popup_type_delete');
const popupEditProfileImg = document.querySelector('.popup_type_edit-profile-img');
const editProfileImgForm = popupEditProfileImg.querySelector('.popup__form');
const newProfileImgInput = editProfileImgForm.querySelector('.popup__input_type_url');
const profileImgFormBtn = popupEditProfileImg.querySelector('.popup__button');
let currentUserId = '';
const validationInfo = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',
  inputErrorClass: 'popup__input-invalid',
  errorClass: 'popup__validation-message'
};

function openImgModal (evt) {
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
  renderLoading(true, editFormBtn);
  updateUserData(nameInput.value, jobInput.value)
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    closeModal(popupEdit);
    renderLoading(false, editFormBtn);
  });
};

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, newCardFormBtn);
  postNewCard(newCardName.value, newCardLink.value)
  .then(data => {
    const newCard = createCard(data, currentUserId, deleteCard, likeCard, openImgModal);
    cardsContainer.prepend(newCard);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, newCardFormBtn);
    closeModal(popupNewCard);
  })
};

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

editButton.addEventListener('click', () => {
  openModal(popupEdit);
  clearValidation(popupEdit, validationInfo);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

editForm.addEventListener('submit', handleEditSubmit);

addButton.addEventListener('click', () => {
  openModal(popupNewCard);
  clearValidation(popupNewCard, validationInfo);
  newCardName.value = '';
  newCardLink.value = '';
});

newCardForm.addEventListener('submit', handleNewCardSubmit);

closeBtns.forEach(function (closeBtn) {
  closeBtn.addEventListener('click', () => closeModal(closeBtn.closest('.popup')))
});

profileImg.addEventListener('click', () => {
  openModal(popupEditProfileImg);
  clearValidation(popupEditProfileImg, validationInfo);
});

editProfileImgForm.addEventListener('submit', editProfileImg);

function editProfileImg (evt) {
  evt.preventDefault();
  renderLoading(true, profileImgFormBtn);
  updateProfileImg(newProfileImgInput.value)
  .then((data) => {
    profileImg.style.backgroundImage = `url(${data.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, profileImgFormBtn);
    closeModal(popupEditProfileImg);
    newProfileImgInput.value = '';
  })
};

enableValidation(validationInfo);

function renderLoading (isLoading, button) {
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

Promise.all([getUserData, getCards])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImg.style.backgroundImage = `url(${userData.avatar})`;
    currentUserId = userData._id;

    cardsData.forEach(function (cardData) {
      const createdCard = createCard(cardData, currentUserId, deleteCard, likeCard, openImgModal);
      cardsContainer.append(createdCard);
    })
  })
  .catch(error => {
    console.log(error)
  });


export { popupDeleteImg };
