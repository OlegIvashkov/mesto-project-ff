const allPopups = document.querySelectorAll('.popup');
//Обработчик для закрытия модального окна при нажатии Esc.
function handleEscape(event) {
  if (event.key == 'Escape') {
    closePopup();
  };
};

//Обработчик для закрытия модального окна при нажатии на оверлей.
function handleOverlayClose(event) {
  if (document.querySelector('.popup_is-opened') && event.target.classList.contains('popup_is-opened')) {
    closePopup();
  };
};

function openPopup (popup) {
  //Реализуем возможность закрытия модального окна при нажатии на esc.
  window.addEventListener('keydown', handleEscape);
  //Реализуем возможность закрытия модального окна при нажатии на оверлей.
  window.addEventListener('mousedown', handleOverlayClose);
  //Показываем окно.
  popup.classList.toggle('popup_is-opened');
};

function closePopup() {
  let currentPopup;
  for (let i = 0; i < allPopups.length; i++) {
    if (allPopups[i].classList.contains('popup_is-opened')) {
      currentPopup = allPopups[i]; 
    };
  };
  currentPopup.classList.toggle('popup_is-opened');
  //Удаляем слушатель для закрытия при нажатии Esc или нажатии на оверлей;
  window.removeEventListener('keydown', handleEscape);
  window.removeEventListener('mousedown', handleOverlayClose);
};

export {  
  allPopups,
  openPopup, 
  closePopup
};