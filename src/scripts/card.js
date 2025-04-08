//Темплейт карточки и необходимые узлы.
const cardTemplate = document.querySelector('#card-template').content;
const popupImage = document.querySelector('.popup_type_image');

//Эту функцию передаём как обработчик открытия окна с картинкой, чтобы вставить ссылку на картинку.
function addImageToPopup(popup) {
  popup.querySelector('.popup__image').src = event.target.src;
  popup.querySelector('.popup__image').alt = event.target.alt;
  popup.querySelector('.popup__caption').innerText = event.target.alt;  
};

//Функция создания карточки
function createCard(cardName, cardSource, deleteCard, likeCard, openPopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardName;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardSource;
  cardImage.alt = cardName;
  cardImage.addEventListener('click', () => openPopup(popupImage)); 
  cardImage.addEventListener('click', () => addImageToPopup(popupImage));
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCard);
  return cardElement; 
};

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove()
};

//Создаём функцию лайка карточки.
function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
};

export { 
  cardTemplate,
  popupImage,
  addImageToPopup,
  createCard,
  deleteCard,
  likeCard
};
