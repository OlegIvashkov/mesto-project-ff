import '../pages/index.css';
import { initialCards } from './cards.js';
import {  
  popupOpen, 
  popupClose,
  changeProfileInfo,
  addCard,
} from './modal.js';
import { 
  createCard,
  deleteCard,
  likeCard,
} from './card.js';
//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//DOM узлы.
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddCardButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupCloseButtonList = document.querySelectorAll('.popup__close');
const profileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];

//Глобальные переменные.
let cardName = '';
let cardSource = ''; 
let cardElement;

//Вывести карточки на страницу
initialCards.forEach(function (item) {
  cardName = item.name;
  cardSource = item.link;
  cardElement = createCard(cardName, cardSource, deleteCard, likeCard, popupOpen);
  placesList.append(cardElement);
});

//Добавляем слушатели открытия окна соответствующим кнопкам.
profileEditButton.addEventListener('click', () => popupOpen(popupEdit));
profileAddCardButton.addEventListener('click', () => popupOpen(popupAddCard));

//Добавляем всем кнопкам, закрывающим окна, соответствуюший обработчик.
for (let i = 0; i < popupCloseButtonList.length; i++) {
  popupCloseButtonList[i].addEventListener('click', () => popupClose());
};

//Реализуем возможность закрытия модального окна при нажатии на оверлей.
window.addEventListener('click', function (event) {
  if (document.querySelector('.popup_is-opened') && event.target.classList.contains('popup_is-opened')) {
    popupClose();
  }; 
});


/* //Реализуем возможность закрытия модального окна при нажатии на esc.
window.addEventListener('keydown', function(event) {  
  if (event.key == 'Escape') {
    popupClose();
  };
}); */

//Добавляем форме слушатель события submit.
profileForm.addEventListener('submit', changeProfileInfo);

//Добавляем обработчик addCard форме добавляения карточки на страницу.
addCardForm.addEventListener('submit', addCard);

export { 
  cardTemplate,
  placesList,
  profileEditButton,
  profileAddCardButton,
  popupEdit, 
  popupImage,
  popupAddCard,
  popupCloseButtonList,
  profileForm,
  addCardForm, 
  cardName,
  cardSource,
  cardElement
};

