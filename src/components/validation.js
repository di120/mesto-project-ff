function showErrorMsg (form, input, errorMsg, validationConfig) {
  input.classList.add(validationConfig.inputErrorClass);
  const inputError = form.querySelector(`.${input.id}-error`);
  inputError.textContent = errorMsg;
}

function hideErrorMsg (form, input, validationConfig) {
  input.classList.remove(validationConfig.inputErrorClass);
  const inputError = form.querySelector(`.${input.id}-error`);
  inputError.textContent = '';
}

function isValid (form, formInput, validationConfig) {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }
  if (!formInput.validity.valid) {
    showErrorMsg(form, formInput, formInput.validationMessage, validationConfig)
  } else {
    hideErrorMsg(form, formInput, validationConfig)
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

function setEventListeners (form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    })
  })
}

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

const clearValidation = (formElement, validationConfig) => {
  const errorList = Array.from(formElement.querySelectorAll(`.${validationConfig.errorClass}`));
  const submitBtn = formElement.querySelector(validationConfig.submitButtonSelector);
  errorList.forEach((errorElement) => {
    errorElement.textContent = '';
  })
  submitBtn.disabled = true;
  submitBtn.classList.add(validationConfig.inactiveButtonClass);
}

export { enableValidation, clearValidation };
