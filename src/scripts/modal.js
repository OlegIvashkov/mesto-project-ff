import { 
  placesList,
  profileForm,
  addCardForm, 
} from './index.js';

import { 
  createCard,
  deleteCard,
  likeCard,
} from './card.js';

//Обработчик для закрытия модального окна при нажатии Esc.
function escape(event) {
  if (event.key == 'Escape') {
    popupClose();
  };
};

function popupOpen (popup) {
  //Реализуем возможность закрытия модального окна при нажатии на esc.
  window.addEventListener('keydown', escape);
  //Показываем окно.
  popup.classList.toggle('popup_is-opened');
  //Если редактируем профиль, то в полях ввода отображаем текущие значения имени пользователя и описание.
  if (popup.classList.contains('popup_type_edit')) {
    const nameProfile = document.querySelector('.profile__title').textContent;     
    popup.querySelector('.popup__input_type_name').placeholder = nameProfile;
    const descriptionProfile = document.querySelector('.profile__description').textContent;
    popup.querySelector('.popup__input_type_description').placeholder = descriptionProfile; 
  };
  //Если нажали на картинку, то в отрывающееся окно нужно вставить ссылку на картинку и описание.
  if (event.target.src) {
    popup.querySelector('.popup__image').src = event.target.src;
    popup.querySelector('.popup__image').alt = event.target.alt;
    popup.querySelector('.popup__caption').innerText = event.target.alt;
  }; 
};

function popupClose() {
  const allPopups = document.querySelectorAll('.popup');
  let currentPopup;
  for (let i = 0; i < allPopups.length; i++) {
    if (allPopups[i].classList.contains('popup_is-opened')) {
      currentPopup = allPopups[i]; 
    };
  };
  //Если модифицировали форму, но закрыли, то нужно сбросить значения.
  if (currentPopup.classList.contains('popup_type_edit')) { 
    const profileForm = currentPopup.querySelector('.popup__form');
    profileForm.reset();
  }; 
  currentPopup.classList.toggle('popup_is-opened');
  //Удаляем слушатель для закрытия при нажатии Esc;
  window.removeEventListener('keydown', escape);
};

//Обработчик, который сработает при нажатии на кнопку Сохранить и отредактирует данные профиля.
function changeProfileInfo(event) {
  event.preventDefault();
  const inputName = profileForm.elements.name.value;
  const inputDescription = profileForm.elements.description.value;
  //Если пользователь ввёл данные, то редактируем страницу, а если нет - оставляем то, что было до открытия окна.
  if (inputName == '') {
    document.querySelector('.profile__title').textContent = nameProfile;
  } else {
    document.querySelector('.profile__title').textContent = inputName;
  };  
  if (inputDescription == '') {
    document.querySelector('.profile__description').textContent = descriptionProfile;    
  } else {
    document.querySelector('.profile__description').textContent = inputDescription;
  };  
  profileForm.reset()
  popupClose();  
};

//Функция добавления карточки.
function addCard(event) {
  event.preventDefault();
  //Выбираем введённые данные - название карточки  и ссылку.
  const inputCardName = addCardForm.elements['place-name'].value;
  const inputCardUrl = addCardForm.elements.link.value;
  //Создаём карточку.
  const newCard = createCard(inputCardName, inputCardUrl, deleteCard, likeCard, popupOpen);
  //Добавляем карточку на страницу.
  placesList.insertBefore(newCard, placesList.children[0]);
  addCardForm.reset();
  popupClose();
};

export {  
  popupOpen, 
  popupClose,
  changeProfileInfo,
  addCard
};




