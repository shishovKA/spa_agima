class Weektable {

    constructor (container, dayNames, timeTable) {
        this.container = container;
        this.dayNames = dayNames;
        this.timeTable = timeTable;
    
        this._renderDayList = this._renderDayList.bind(this);
        this._createDay = this._createDay.bind(this);
        this._setEventListeners = this._setEventListeners.bind(this);
        this._dayClick = this._dayClick.bind(this);

        this._renderDayList();
        this._setEventListeners();
        this._findCurrentDay();
    }

    _renderDayList() {
        this.dayList = this.dayNames.map((day) => {
            const element = this._createDay(day);
            this.container.append(element);
            return element;
        })
    }

    _findCurrentDay() {
        const now = new Date()
        let curDay = now.getDay();
        if (curDay === 0) {curDay = 6}
            else {curDay = curDay - 1}
        this.dayList[curDay].classList.add('dayblock_now');
        this.currentDay = this.dayList[curDay];
        this.timeTable.showDayTimeTable(this.dayNames[curDay].name);
    }

    _createDay (day) {
        const dayBtn = document.createElement('p');
        dayBtn.classList.add('dayblock');
        dayBtn.textContent = day.text;
        return dayBtn;
    }

    _dayClick(index) {
        this.timeTable.showDayTimeTable(this.dayNames[index].name);
        this.currentDay.classList.remove('dayblock_now');
        this.currentDay = event.target; 
        this.currentDay.classList.add('dayblock_now'); 
    }

    _setEventListeners() {
        console.log(this.dayList);

        this.dayList.forEach((btn,index) => {
            btn.addEventListener("click", () => {this._dayClick(index)});
        });

      }

}