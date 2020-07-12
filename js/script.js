"use strict";

(function () {
//РАЗДЕЛ: Константы


const storage = new Storage(localStorage, startData);
const timeTableContainer = document.querySelector('.timetable'); //контайнер страницы, куда загружается расписание
const weekTableContainer = document.querySelector('.window_week'); //контайнер страницы, куда загружается расписание
const timeTable = new Timetable(timeTableContainer, storage);
const weekTable = new Weektable(weekTableContainer, dayNames, timeTable);

const addBtn = document.querySelector('.inputblock__add');
const inputZone = document.querySelector('.inputblock');

const starBtn = document.querySelector('.starbutton');


//попапы
//const popupNewPlace = new PopupNewPlace(document.querySelector('.root'));


//РАЗДЕЛ: Функции



function clearInput() {
    const node = document.querySelector('.inputblock')
    const fields = node.querySelectorAll('.field');
    fields.forEach((field)=>{field.textContent = ''});
}



function addNewTask() {
    let row = event.target.parentElement;


    const replaceTop = row.animate(
        [
          { top: '0px', opacity: 1 },
          {  opacity: 0.2 },
          { top: '-400px', opacity: 0 }
        ], {
          duration: 400,
        }
      );

    replaceTop.onfinish = function() {
      const fields = row.querySelectorAll('.field');
      const newTask = {time: fields[0].textContent,
                      task: fields[1].textContent}
      timeTable.insertTask(newTask);
      clearInput()
      };

}


function keyHandler(event) {
  if (event.keyCode == 13) addNewTask();
}

//РАЗДЕЛ: Слушатели событий

addBtn.addEventListener('click', addNewTask);
inputZone.addEventListener('keydown', keyHandler);

//РАЗДЕЛ: Вызов функций и методов



})();
