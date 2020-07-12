"use strict";

(function () {
//РАЗДЕЛ: Константы


const storage = new Storage(localStorage, startData);
const timeTableContainer = document.querySelector('.timetable'); //контайнер страницы, куда загружается расписание
const weekTableContainer = document.querySelector('.window_week'); //контайнер страницы, куда загружается расписание
const timeTable = new Timetable(timeTableContainer, storage);
const weekTable = new Weektable(weekTableContainer, dayNames, timeTable);

const addBtn = document.querySelector('.inputblock__add');


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


    row.animate(
        [
          { top: '0px', opacity: 1 },
          {  opacity: 0.2 },
          { top: '-400px', opacity: 0 }
        ], {
          duration: 400,
        }
      );

    const fields = row.querySelectorAll('.field');
    const newTask = {time: fields[0].textContent,
                    task: fields[1].textContent}
    timeTable.insertTask(newTask);
    
    clearInput()

}


//РАЗДЕЛ: Слушатели событий

addBtn.addEventListener('click', addNewTask);

//РАЗДЕЛ: Вызов функций и методов



})();
