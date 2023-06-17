let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let submitButton = document.querySelector('.popup__submit-btn');
let popupWindow = document.querySelector('.popup');

let formElement = document.querySelector('.input');
let nameInput = formElement.querySelector('.input__text_type_name');
let jobInput = formElement.querySelector('.input__text_type_about');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

function PopupAppear() {
    popupWindow.classList.toggle('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    PopupAppear();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', PopupAppear);
closeButton.addEventListener('click', PopupAppear);