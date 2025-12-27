import {startGame} from './core/gameLogic'
import{unfinishedGameNotificationWindow} from './rendering/modal'
import{RecordedGame} from './recordGame/previewWinningGame'
import {toggleUIVisibility} from './rendering/modal'

let divContainer = document.querySelector('.div-container');
let menuContainer = document.querySelector('.menu-container');
let iconMenu = document.querySelector('.icon-Menu');
let buttonsMenu = document.querySelectorAll('.level-btn');

// Обнуляем localStorage
if(window.performance) {
  const urlParams = new URLSearchParams(window.location.search);
  const indexMapRecordGame = urlParams.get('indMap');
  // Смотрим запись победной игры
  if(indexMapRecordGame){
    // menuContainer.classList.add('menu-hidden') // Делаем не видимым игровое меню и .display = 'none' .opacity = 0; // устанавливает уровень прозрачности элемента равному 0.           
    // divContainer.classList.add('div-container-visible')// Делаем видимым игровое поле .display = 'flex'
    // iconMenu.classList.add('icon-hidden')
    toggleUIVisibility()
    localStorage.removeItem('objDateLastMove')
    RecordedGame(indexMapRecordGame)
  }
   // Показываем модальное окно для востановление игры после пререзагрузки браузера.
  if(localStorage.getItem('objDateLastMove') !== null){
    unfinishedGameNotificationWindow()
  }
};

buttonsMenu.forEach(button => {
  button.addEventListener('click', (event) => {
    event.stopPropagation()
    const text = button.textContent;
      const match = text.match(/Карта (\d+)x(\d+)/);
      if (match) {
        const matrixSizeHigth = parseInt(match[1], 10);
        const matrixSizeWidth = parseInt(match[2], 10);
          argumentsParameters(matrixSizeHigth, matrixSizeWidth);
        }
    });
});
// Функция для плавного входа в игру после меню.
function argumentsParameters(matrixSizeHigth, matrixSizeWidth){
  //menuContainer.style.opacity = 0; // устанавливает уровень прозрачности элемента равному 0.
  // Ждём окончания перехода и устанавливаем display: none
  menuContainer.addEventListener('transitionend', (event) => {
    event.stopPropagation()
  //   menuContainer.classList.add('menu-hidden') // Делаем не видимым игровое меню и .display = 'none' .opacity = 0; // устанавливает уровень прозрачности элемента равному 0.           
  //  // menuContainer.style.display = 'none' // Делаем не видимым игровое меню
  //   divContainer.classList.add('div-container-visible')// Делаем видимым игровое поле .display = 'flex'
  //   // divContainer.style.display = 'flex';
  //   // iconMenu.style.display = 'block' // Делаем не видимым ссылку назад в меню
  //   iconMenu.classList.add('icon-hidden') // Делаем видимы иконку выхода в главного меню.
    toggleUIVisibility()
    startGame(matrixSizeHigth, matrixSizeWidth) // Старт игры
  }, { once: true }); //Параметр (once: true) - обработчик сработает только один раз и автоматически удалится
}
      //                 Делаем не видимым ссылку Назад в меню
  // <div class="icon-Menu">
  //   <a href="../mainMenu.html" class="back-link">← Назад в меню</a>
  // </div>

  //                          Делаем видимым игровое поле
  // <div class="div_container">
  //   <div class="container_сountdown_progress">
  //     <div class="couterGame"></div>
  //     <div class="time_display" id="display">00:00</div>
  //   </div>
  //   <div class="container"></div>
  //   <div class="panel">
  //     <div class="arrow-diag left"></div>
  //     <button id="resetNew" class="reset">Играть заного</button>
  //     <button id="resetNewMap" class="reset">Новая карта</button>
  //     <div class="arrow-diag right"></div>
  //   </div>
  // </div>

   //                         Делаем не видимым игровое меню
  //  <div class="menu-container">
  //   <div class="panel-container">
  //     <h1 class="game-title">Выберите уровень</h1>
  //     <div class="level-menu">
  //       <button type="button" class="level-btn" onclick="argumentsParameters(3, 3)">Карта 3x3</button>
  //       <button type="button" class="level-btn" onclick="argumentsParameters(4, 4)">Карта 4x4</button>
  //       <button type="button" class="level-btn" onclick="argumentsParameters(5, 4)">Карта 5x4</button>
  //       <button type="button" class="level-btn" onclick="argumentsParameters(5, 5)">Карта 5x5</button>
  //       <a href="../mainMenu.html" class="back-link">Назад в меню</a>
  //     </div>
  //   </div>
  // </div>