//Темплейт карточки и необходимые узлы.
const cardTemplate = document.querySelector('#card-template').content;

//Функция создания карточки
function createCard(cardName, cardSource, cardOwnerId, cardId, cardLikesNumber, likeStatus, likeCard, handleImageClick, openPopup, confirmCardDelete, currentUserId, popupConfirmCardDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.Id = cardId;
  cardElement.querySelector('.card__title').textContent = cardName;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.alt = cardName;
  cardImage.src = cardSource;  
  cardImage.addEventListener('click', (event) => handleImageClick(event));
  const cardLikes = cardElement.querySelector('.card__likes');
  cardLikes.textContent = cardLikesNumber;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (cardOwnerId === currentUserId) {    
    deleteButton.addEventListener('click', () => confirmCardDelete(popupConfirmCardDelete));     
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

export { 
  cardTemplate,
  createCard,
};
