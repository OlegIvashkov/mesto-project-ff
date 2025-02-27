// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
let cardName = '';
let cardSource = ''; 
// @todo: Функция создания карточки
function createCard(cardName, cardSource, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardName;
  cardElement.querySelector('.card__image').src = cardSource; 
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  return cardElement; 
}
// @todo: Функция удаления карточки
function deleteCard(event) {
  const deleteButton = event.target;
  const listItem = deleteButton.closest('.card');
  listItem.remove(); 
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  cardName = item.name;
  cardSource = item.link;
  cardElement = createCard(cardName, cardSource, deleteCard);
  placesList.append(cardElement);
});

