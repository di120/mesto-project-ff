const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEsc);
  popup.addEventListener('click', handleOverlay);
};

const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEsc);
};

const handleEsc = (evt) => {
  if (evt.key === 'Escape') {
    const closingPopup = document.querySelector('.popup_is-opened');
    closeModal(closingPopup);
  }
};

const handleOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
      const closingPopup = document.querySelector('.popup_is-opened');
      closeModal(closingPopup);
  }
};

export { openModal, closeModal };
