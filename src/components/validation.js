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

const disableSubmitButton = (button, config) => {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass)
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, validationConfig);
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
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((input) => hideErrorMsg (formElement, input, validationConfig));
  const submitBtn = formElement.querySelector(validationConfig.submitButtonSelector);
  disableSubmitButton(submitBtn, validationConfig);
}

export { enableValidation, clearValidation };
