const editButton = document.querySelector('.profile__edit-btn');
const closeProfileButton = document.querySelector('.popup__close-btn_profile');
const closeNewCardButton = document.querySelector('.popup__close-btn_new-card');
const closeCardButton = document.querySelector('.popup__close-btn_card');
const addButton = document.querySelector('.profile__add-btn');
const createButton = document.querySelector('.popup__submit-btn_create');
const saveButton = document.querySelector('.popup__submit-btn_save');
const popupProfile = document.querySelector('.popup_type-edit');
const popupCards = document.querySelector('.popup_type-add');
const popupImage = document.querySelector('.popup_type-view');
const formProfile = document.querySelector('.form_type-profile');
const nameInput = formProfile.querySelector('.form__text_type_name');
const jobInput = formProfile.querySelector('.form__text_type_about');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const cardsTemplate = document.querySelector('.card-template');
const elementList = document.querySelector('.elements');
const formCard = document.querySelector('.form_type-card');
const labelInput = document.querySelector('.form__text_type_label');
const linkInput = document.querySelector('.form__text_type_link');

/* Функция для открытия попапов */
function appearPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', hidePopupOnButton);
};

/* Функция для закрытия попапов */
function hidePopup(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', hidePopupOnButton);
};

/* Функция для закрытия попапов по нажатию ESC */
function hidePopupOnButton(evt) {
    openedPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') { 
        hidePopup(openedPopup);
    }
};

/* Функция для закрытия попапов по нажатию на оверлэй */
function hidePopupOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        hidePopup(evt.currentTarget);
    }
}

/* Функция для редактирования профиля */
function profileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    hidePopup(popupProfile);
};

/* Функция для создание карточки, отслеживание лайка, удаление карточки и открытие попапа карточки */
const createCard = ({name, link}) => {
    const clone = cardsTemplate.content.cloneNode(true);
    const cardElement = clone.querySelector('.element');
    const cardImage = cardElement.querySelector('.element__image');

    cardElement.querySelector('.element__name').textContent = name; 
    cardImage.src = link;
    cardImage.alt = name;

    const likeButton = cardElement.querySelector('.element__like');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('element__like_active');
    });

    const deleteButton = cardElement.querySelector('.element__trash');
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

    cardImage.addEventListener('click', () => {
        popupImage.querySelector('.popup__image').src = link;
        popupImage.querySelector('.popup__image').alt = name;
        popupImage.querySelector('.popup__caption').textContent = name;
        appearPopup(popupImage);
    });

    return cardElement;
};

/* Функция для добавления карточки */
const cardFormSubmit = (evt) => {
    evt.preventDefault();

    const name = labelInput.value;
    const link = linkInput.value;
    const card = createCard({name, link});
    elementList.prepend(card);

    hidePopup(popupCards);
};

/* Функция для заполнения контейнера карточками */
initialCards.forEach((item) => {
    const cardElement = createCard(item);
    elementList.append(cardElement);
});

formCard.addEventListener('submit', cardFormSubmit); /* Подтверждение заполненной формы для добавления новой карточки */
formProfile.addEventListener('submit', profileFormSubmit); /* Подтверждение заполненной формы для редактирования профиля */

/* Отслеживания клика по кнопке открытия для попапа редактирования профиля */
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    appearPopup(popupProfile);
    removeErrors(popupProfile, ValidationConfig);
    enableSubmitButton(saveButton, ValidationConfig)});

/* Отслеживания клика по кнопке открытия попапа для добавления новой карточки */
addButton.addEventListener('click', () => {
    labelInput.value = '';
    linkInput.value = '';
    removeErrors(popupCards, ValidationConfig);
    appearPopup(popupCards);
    disableSubmitButton(createButton, ValidationConfig)}); 

closeProfileButton.addEventListener('click', () => hidePopup(popupProfile)); /* Отслеживания клика по кнопке закрытия попапа для редактирования профиля */
closeNewCardButton.addEventListener('click', () => hidePopup(popupCards)); /* Отслеживания клика по кнопке закрытия попапа для добваления новой карточки */
closeCardButton.addEventListener('click', () => hidePopup(popupImage)); /* Отслеживания клика по кнопке закрытия попапа для просмотра карточки */
popupProfile.addEventListener('click', hidePopupOnOverlay); /* Отслеживания клика на оверлэй для закрытия попапа редактирования профиля */
popupCards.addEventListener('click', hidePopupOnOverlay); /* Отслеживания клика на оверлэй для закрытия попапа добваления новой карточки */
popupImage.addEventListener('click', hidePopupOnOverlay); /* Отслеживания клика на оверлэй для закрытия попапа просмотра карточки */


