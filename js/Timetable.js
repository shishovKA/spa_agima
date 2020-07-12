class Timetable {

    constructor (container, storage) {
        this.container = container;
        this.storage = storage;
        this._renderTaskList = this._renderTaskList.bind(this);
        this._createTaskElement = this._createTaskElement.bind(this);
        this.showDayTimeTable = this.showDayTimeTable.bind(this);
        this._inputChange = this._inputChange.bind(this);
        this._deleteTask = this._deleteTask.bind(this); 
        this._isPast = this._isPast.bind(this); 
        this.changeDayTasks = this.changeDayTasks.bind(this); 
    }

    changeDayTasks(day2) {
        const dayData1 = this.storage.getDayData(this.day);
        this.storage.setDayData(day2, dayData1);
    }

    showDayTimeTable(day) {
        this.day = day;
        this._renderTaskList();
    }

    _renderTaskList() {
        const dayData = this.storage.getDayData(this.day);

        while (this.container.firstChild) {
            this.container.removeChild(this.container.lastChild);
          }

        dayData.forEach(task => {
            const element = this._createTaskElement(task);
            this.container.append(element);
        });
    }

    _isPast(time) {
        const now = new Date();
        console.log(this.day)
        
        
        let curDay = dayNames.findIndex( (item) => {
            return (item.name === this.day)
          });

        let nowDay = now.getDay();
        if (nowDay === 0) {nowDay = 6}
            else {nowDay = nowDay - 1}

        console.log(curDay, nowDay);
        console.log((now.toLocaleTimeString() > time));
        console.log((nowDay >= curDay));

        if (nowDay > curDay) return true;
        if (nowDay < curDay) return false;

        if (nowDay == curDay) {
            if (now.toLocaleTimeString() <= time) {return false} else {return true}
        }
        
    }

    _createTaskElement (task) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('timetable__row');

        const feild_1 = document.createElement('p');
        feild_1.classList.add('field');
        feild_1.setAttribute("contenteditable", "true");
        feild_1.textContent = task.time;

        const feild_2 = document.createElement('p');
        feild_2.classList.add('field');
        feild_2.setAttribute("contenteditable", "true");
        feild_2.textContent = task.task;

        const delButton = document.createElement('div');
        delButton.classList.add('timetable__delete');
        delButton.classList.add('button');

        if (this._isPast(task.time)) {
            feild_1.classList.add('field_past');
            feild_2.classList.add('field_past');
        }

        taskElement.append(feild_1);
        taskElement.append(feild_2);
        taskElement.append(delButton);

        taskElement.addEventListener('focusout', this._inputChange);
        delButton.addEventListener('click', this._deleteTask)
        
        return taskElement;
    }

    _childNumber(child) {
        let i = 0;
        while( (child = child.previousSibling) != null ) 
        i++;
        return i;
    }

    _getTask(node) {
        const fields = node.querySelectorAll('.field');
        const newTask = {time: fields[0].textContent,
                            task: fields[1].textContent}
        return newTask;
    }

    _inputChange(event) {
        let row = event.target.parentElement;
        const posNum = this._childNumber(row)
        const newTask = this._getTask(row);
        this.storage.updateTask(this.day, posNum, newTask);
        this._renderTaskList();
    }


    insertTask(newTask) {
        this.storage.addTask(this.day, newTask);
        this._renderTaskList();
    }


    _deleteTask(event) {
        let row = event.target.parentElement;
        const posNum = this._childNumber(row)
        this.storage.removeTask(this.day, posNum);
        this._renderTaskList();
    }



    /*

    removeElement () {
        this._delEventListeners();
        this.element.remove();       
    }

    inputText(event) {
        this.textValue = event.target.textContent;
        this.storage.updateElmentById(this.id,this.textValue);
    }

    _setEventListeners() {
        this.element.addEventListener("input", this.inputText);
      }

    _delEventListeners() {
//        this.btnLike.removeEventListener('click', this._like);
//        this.btnDelete.removeEventListener('click', this._remove);
//        this.image.removeEventListener('click', this._openImage);
    }

    */

}