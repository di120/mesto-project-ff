const openModal = (popupClass) => {
  const popup = document.querySelector(popupClass);
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEsc);
  popup.addEventListener('click', handleOverlay);
};

const closeModal = () => {
  const closingPopup = document.querySelector('.popup_is-opened');
  closingPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEsc);
};

const handleEsc = (evt) => {
  if (evt.key === 'Escape') {
    closeModal();
  }
};

const handleOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
      closeModal()
  }
};

export { openModal, closeModal };
