import {
  addLike,
  deleteLike
} from './api.js';

//Темплейт карточки и необходимые узлы.
const cardTemplate = document.querySelector('#card-template').content;
const popupImage = document.querySelector('.popup_type_image');
const popupConfirmCardDelete = document.querySelector('.popup_type_confirm');

//Функция создания карточки
function createCard(cardName, cardSource, cardOwnerId, cardId, cardLikesNumber, likeStatus, likeCard, handleImageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.Id = cardId;
  cardElement.querySelector('.card__title').textContent = cardName;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.alt = cardName;
  cardImage.src = cardSource;  
  cardImage.addEventListener('click', (event) => handleImageClick(popupImage, event));
  const cardLikes = cardElement.querySelector('.card__likes');
  cardLikes.textContent = cardLikesNumber;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (cardOwnerId === '527f83e877f756bf47de8ed5') {    
    deleteButton.addEventListener('click', () => {
      popupConfirmCardDelete.classList.toggle('popup_is-opened');
      popupConfirmCardDelete.cardToDelete = cardElement;
    }); 
  } else {
    deleteButton.remove();
  };
  const likeButton = cardElement.querySelector('.card__like-button');
  if (likeStatus === true){
    likeButton.classList.add('card__like-button_is-active');
  };//Если карточка была лайкнута, то отрисовываем сердечко в нажатом состоянии.
  likeButton.addEventListener('click', likeCard);
  likeButton.cardId = cardId;
  likeButton.cardLikes = cardLikes;//Узел с количеством лайков записали как свойство кнопки, чтобы потом к нему обратиться для редактирования количества лайков.
  return cardElement;
};

/* // @todo: Функция удаления карточки
function deleteCard(cardElement) {  
  cardElement.remove();
}; */

//Создаём функцию лайка карточки.
function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
  if (event.target.classList.value.includes('card__like-button_is-active')) {
    addLike(event.target.cardId)
      .then((result) => {
        event.target.cardLikes.textContent = result.likes.length;//С сервера взяли количество лайков и сразу его вписали на страницу.
      });
  } else {
    deleteLike(event.target.cardId)
      .then((result) => {
        event.target.cardLikes.textContent = result.likes.length;//С сервера взяли количество лайков и сразу его вписали на страницу.
      })  
  }  
};

export { 
  cardTemplate,
  popupImage,
  createCard,
  likeCard,
  popupConfirmCardDelete
};
