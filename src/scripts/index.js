import '../pages/index.css';
import {  
  openPopup, 
  closePopup
} from './modal.js';
import { 
  createCard
} from './card.js';
import {
  clearValidation,
  enableValidation
} from './validation.js';
import {
  getUserData,
  getCardsData,
  changeProfileInfoAPI,
  sendCardToServer,
  confirmDeleteCard,
  sendAvatarToServer,
  addLike,
  deleteLike
} from './api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
//DOM узлы.
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddCardButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const closePopupButtonList = document.querySelectorAll('.popup__close');
const profileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const avatarForm = document.forms['new-avatar'];
const nameProfileNode = document.querySelector('.profile__title');
const descriptionProfileNode = document.querySelector('.profile__description');
const profileImageElement = document.querySelector('.profile__image');
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupEditInputName = popupEdit.querySelector('.popup__input_type_name');
const popupEditInputDescription = popupEdit.querySelector('.popup__input_type_description');
const confirmCardDeleteButton = document.querySelector('.popup__button-confirm');
const editProfileImg = document.querySelector('.profile__image');
const popupEditProfileImg = document.querySelector('.popup_type_edit-profile-img');
const editProfileImgButton = document.querySelector('.popup__button-edit-profile-img');
const editProfileButton = document.querySelector('.popup__button-edit-profile');
const cardSaveButton = document.querySelector('.popup__button-save-card'); 
const popupConfirmCardDelete = document.querySelector('.popup_type_confirm');

//Глобальные переменные.
let cardName = '';
let cardSource = ''; 
let cardOwnerId = '';
let cardId = '';
let cardLikes = document.querySelector('.card__likes');//Элемент, в котором отображается количество лайков. */
let cardLikesNumber = 0;//Сколько у карточки лайков.
let likeStatus = null;//Лайкнута ли карточка пользователем, чтобы правильно отображать лайк
let cardElement;
let nameProfile = ''; 
let descriptionProfile = '';
let currentUserId = '';//Мой id, чтобы добавлять кнопки удаления только на мои карточки

//Получаем с сервера данные и отрисовываем информацию о пользователе и карточки
Promise.all([getUserData(), getCardsData()])
  .then(([user, initialCards]) => {
    nameProfileNode.textContent = user.name;
    nameProfile = user.name;
    descriptionProfileNode.textContent = user.about;
    descriptionProfile = user.about;
    profileImageElement.style.backgroundImage = `url('${user.avatar}')`;
    currentUserId = user['_id'];
    initialCards.forEach(function (item) {
      cardName = item.name;
      cardSource = item.link;
      cardOwnerId = item.owner['_id'];
      cardId = item['_id'];
      cardLikesNumber = item.likes.length;
      const whoLiked = item.likes.map(obj => obj['_id']); //Составляем массив лайкнувших.
      if (whoLiked.includes(currentUserId)) {
        likeStatus = true;
      } else {
        likeStatus = false;
      }; //Если мной лайкнута карточка, то сохранили это в отдельном свойстве, используем для правильного отображения сердечка.
      cardElement = createCard(cardName, cardSource, cardOwnerId, cardId, cardLikesNumber, likeStatus, likeCard, handleImageClick, openPopup, confirmCardDelete, currentUserId, popupConfirmCardDelete);
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log('Ошибка', err);
  });

function changeProfileInfo(event) {
  event.preventDefault();
  editProfileButton.textContent = 'Сохранение...';
  const inputName = profileForm.elements.name.value;
  const inputDescription = profileForm.elements.description.value;
  changeProfileInfoAPI(inputName, inputDescription)
    .then((result) => {
        nameProfileNode.textContent = result.name;
        nameProfile = result.name;
        descriptionProfileNode.textContent = result.about;
        descriptionProfile = result.about; // Обновляем значение переменной при изменении
        closePopup();        
    })
    .catch((err) => {
      console.log('Ошибка', err)
    })
    .finally(() => {
    editProfileButton.textContent = 'Сохранить';
    });
}; 

function editProfile(popupEdit) {
  clearValidation(profileForm, validationConfig);
  popupEditInputName.value = nameProfile;
  popupEditInputDescription.value = descriptionProfile;
};

//Эту функцию передаём как обработчик открытия окна с картинкой, чтобы вставить ссылку на картинку.
function addImageToPopup(event) {
  popupImageElement.src = event.target.src;
  popupImageElement.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;
};

function handleImageClick(event) {
  openPopup(popupImage);
  addImageToPopup(event);
};

//Создаём функцию лайка карточки.
function likeCard(event) {  
  if (!event.target.classList.value.includes('card__like-button_is-active')) {
    addLike(event.target.cardId)
      .then((result) => {
        event.target.classList.toggle('card__like-button_is-active');
        event.target.cardLikes.textContent = result.likes.length;})//С сервера взяли количество лайков и сразу его вписали на страницу.
        .catch((err) => {
          console.log('Ошибка', err)
        });
  } else {
    deleteLike(event.target.cardId)
      .then((result) => {
        event.target.classList.toggle('card__like-button_is-active')
        event.target.cardLikes.textContent = result.likes.length;//С сервера взяли количество лайков и сразу его вписали на страницу.
      })
      .catch((err) => {
        console.log('Ошибка', err)
      });  
  }  
};

//Функция добавления карточки.
function addCard(event) {
  event.preventDefault();
  cardSaveButton.textContent = 'Сохранение...';
  //Выбираем введённые данные - название карточки  и ссылку.
  const inputCardName = addCardForm.elements['place-name'].value;
  const inputCardUrl = addCardForm.elements.link.value;
  //Отправляем данные о карточке на сервер.
  sendCardToServer(inputCardName, inputCardUrl)
  .then((result) => {    
    //Создаём карточку.
    const newCard = createCard(result.name, 
      result.link, 
      result.owner['_id'], 
      result['_id'], 
      result.likes.length, 
      false,  
      likeCard, 
      handleImageClick, 
      openPopup,
      confirmCardDelete,
      currentUserId,
      popupConfirmCardDelete);
    //Добавляем карточку на страницу.
    placesList.insertBefore(newCard, placesList.children[0]);
    addCardForm.reset();
    clearValidation(addCardForm, validationConfig);
    closePopup(); 
    cardSaveButton.textContent = 'Сохранить';
  })
  .catch((err) => {
    console.log('Ошибка', err)
  });
};
  
//Добавляем слушатели открытия окна соответствующим кнопкам.
profileEditButton.addEventListener("click", () => {
  editProfile(popupEdit);
  openPopup(popupEdit);
});
profileAddCardButton.addEventListener('click', () => openPopup(popupAddCard));
//Добавляем слушатель клика для смены изображения профиля.
editProfileImg.addEventListener('click', () => openPopup(popupEditProfileImg));

//Добавляем всем кнопкам, закрывающим окна, соответствуюший обработчик.
closePopupButtonList.forEach(button => {
  button.addEventListener('click', () => closePopup());
});

//Обработчик клика по кнопке удаления карточки
const confirmCardDelete = (popupConfirmCardDelete) => {
  openPopup(popupConfirmCardDelete);
  popupConfirmCardDelete.cardToDelete = cardElement;  
};

//Добавляем форме слушатель события submit.
profileForm.addEventListener('submit', changeProfileInfo);

//Добавляем обработчик addCard форме добавляения карточки на страницу.
addCardForm.addEventListener('submit', addCard);

//Добавляем обработчик кнопке подтверждения удаления карточки.
confirmCardDeleteButton.addEventListener('click', () => {
  if (popupConfirmCardDelete.cardToDelete) { 
    confirmCardDeleteButton.textContent = 'Удаление...';   
    const cardId = popupConfirmCardDelete.cardToDelete.Id; // Получаем ID карточки       
    confirmDeleteCard(cardId)
      .then(() => {
        popupConfirmCardDelete.cardToDelete.remove(); // Удаляем карточку из DOM
        popupConfirmCardDelete.cardToDelete = null; // Очищаем ссылку на карточку 
        closePopup();
        confirmCardDeleteButton.textContent = 'Да';
      })
      .catch((err) => {
        console.log('Ошибка', err);        
      })
      .finally(() => {
        confirmCardDeleteButton.textContent = 'Да';
      });
  };
});

//Добавляем обработчик для кнопки редактирования изображения профиля
editProfileImgButton.addEventListener('click', (event) => {
  event.preventDefault();
  editProfileImgButton.textContent = 'Сохранение...';
  const avatarUrl = avatarForm.elements['link'].value;
  sendAvatarToServer(avatarUrl)
    .then((result) => {
      profileImageElement.style.backgroundImage = `url('${result.avatar}')`;
    })
    .then(() => {
      closePopup();
      editProfileImgButton.textContent = 'Сохранить';
    })  
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfileImgButton.textContent = 'Сохранить';
    });
});

//Запускаем валидацию.
enableValidation(validationConfig); 