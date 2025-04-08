import '../pages/index.css';
import { initialCards } from './cards.js';
import {  
  openPopup, 
  closePopup,
  allPopups
} from './modal.js';
import { 
  cardTemplate,
  popupImage,
  addImageToPopup,
  createCard,
  deleteCard,
  likeCard
} from './card.js';

//DOM узлы.
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddCardButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const closePopupButtonList = document.querySelectorAll('.popup__close');
const profileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const nameProfileNode = document.querySelector('.profile__title');
const descriptionProfileNode = document.querySelector('.profile__description');

//Глобальные переменные.
let cardName = '';
let cardSource = ''; 
let cardElement;
let nameProfile = nameProfileNode.textContent; 
let descriptionProfile = descriptionProfileNode.textContent;

function editProfile(popup) {
  popup.querySelector('.popup__input_type_name').placeholder = nameProfile;
  popup.querySelector('.popup__input_type_description').placeholder = descriptionProfile;
};

function changeProfileInfo(event) {
  event.preventDefault();
  const inputName = profileForm.elements.name.value;
  const inputDescription = profileForm.elements.description.value;
  if (inputName === '') {
    nameProfileNode.textContent = nameProfile;
  } else {
    nameProfileNode.textContent = inputName;
    nameProfile = inputName; // Обновляем значение переменной при изменении
  };
  if (inputDescription === '') {
    descriptionProfileNode.textContent = descriptionProfile;
  } else {
    descriptionProfileNode.textContent = inputDescription;
    descriptionProfile = inputDescription; // Обновляем значение переменной при изменении
  };
  closePopup();
};

//Функция добавления карточки.
function addCard(event) {
  event.preventDefault();
  //Выбираем введённые данные - название карточки  и ссылку.
  const inputCardName = addCardForm.elements['place-name'].value;
  const inputCardUrl = addCardForm.elements.link.value;
  //Создаём карточку.
  const newCard = createCard(inputCardName, inputCardUrl, deleteCard, likeCard, openPopup);
  //Добавляем карточку на страницу.
  placesList.insertBefore(newCard, placesList.children[0]);
  addCardForm.reset();
  closePopup();
};

//Вывести карточки на страницу
initialCards.forEach(function (item) {
  cardName = item.name;
  cardSource = item.link;
  cardElement = createCard(cardName, cardSource, deleteCard, likeCard, openPopup);
  placesList.append(cardElement);
});

//Добавляем слушатели открытия окна соответствующим кнопкам.
profileEditButton.addEventListener('click', () => openPopup(popupEdit));
profileAddCardButton.addEventListener('click', () => openPopup(popupAddCard));
//При открытии окна редактирвоания профиля, вставляем плейсхолдеры.
profileEditButton.addEventListener('click', () => editProfile(popupEdit));


//Добавляем всем кнопкам, закрывающим окна, соответствуюший обработчик.
closePopupButtonList.forEach(button => {
  button.addEventListener('click', () => closePopup());
});

//Добавляем форме слушатель события submit.
profileForm.addEventListener('submit', changeProfileInfo);

//Добавляем обработчик addCard форме добавляения карточки на страницу.
addCardForm.addEventListener('submit', addCard);