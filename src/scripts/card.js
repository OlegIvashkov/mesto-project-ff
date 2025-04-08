import { 
  cardTemplate,
  popupImage,
  addImageToPopup
} from './index.js';

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
  createCard,
  deleteCard,
  likeCard
}