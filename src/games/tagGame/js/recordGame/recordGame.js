
// import {viewingRecordedGame} from './previewWinningGame'
const port = import.meta.env.VITE_PORT;

let btnExit = document.querySelector('#recordGameExit')

let records = JSON.parse(localStorage.getItem('objVictoryGame')) || []

btnExit.addEventListener('click', function(){
  window.location.href = `http://localhost:${port}/src/games/tagGame/mainMenu.html`;
})

function deleteRecord(index) {
  records.splice(index, 1)
  localStorage.setItem('objVictoryGame', JSON.stringify(records.toSpliced(index, 1)));
  renderRecords()
}

function renderRecords() {
  const tbody = document.querySelector('#recordsTable tbody');

  tbody.innerHTML = ''; 

  records.forEach((record, indexMapRecordGame) => {
    const row = document.createElement('tr');

    const cellNumber = document.createElement('td');
    cellNumber.textContent = indexMapRecordGame + 1;
    row.appendChild(cellNumber);

    const cellCounterMove = document.createElement('td');
    cellCounterMove.textContent = record.couterMove;
    row.appendChild(cellCounterMove);

    const cellTime = document.createElement('td');
    cellTime.textContent = record.time;
    row.appendChild(cellTime);

    const cellDash = document.createElement('td');
    cellDash.textContent = record.date;
    row.appendChild(cellDash);

    const cellSize = document.createElement('td');
    const width = record.GameSettings[0].length;
    const height = record.GameSettings[0][0].length;
    cellSize.textContent = `${width}x${height}`;
    row.appendChild(cellSize);

    const cellButtons = document.createElement('td');

    const btnDelete = document.createElement('button');
    btnDelete.className = 'delete-btn';
    btnDelete.textContent = 'Удалить';
    btnDelete.addEventListener('click', (event) => deleteRecord(indexMapRecordGame));
    cellButtons.appendChild(btnDelete);

    const btnView = document.createElement('button');
    btnView.className = 'delete-btn'; 
    btnView.textContent = 'Посмотреть игру';
    btnView.addEventListener('click', () => viewingRecordedGame(indexMapRecordGame));
    cellButtons.appendChild(btnView);

    row.appendChild(cellButtons);
    tbody.appendChild(row);
});
}
renderRecords()

function viewingRecordedGame(indexMapRecordGame){
  window.location.href = `http://localhost:${port}/src/games/tagGame/pages/tagGame.html?indMap=${indexMapRecordGame}`;
}





