class Storage {

    constructor (localStorage,startData) {
        this.storage = localStorage;
        this.varName = 'data_spa';
        this._firstload = this._firstload.bind(this);
        this._updateStorage = this._updateStorage.bind(this);
        this._getStorageData = this._getStorageData.bind(this);
        this.getDayData = this.getDayData.bind(this);
        this.setDayData = this.setDayData.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.removeTask = this.removeTask.bind(this);

        this._firstload(startData);
    }

    _firstload(startData) {
        if (this.storage.getItem(this.varName) !== null) {
            this._getStorageData();
        }

        else {
            this.data = startData;
            this._updateStorage();
        }
    }

    _updateStorage() {
        this.storage.clear();
        this.storage[this.varName] = JSON.stringify(this.data);
    }

    _getStorageData() {
        this.data = JSON.parse(this.storage[this.varName]);
    }

    getDayData(day) {
        return this.data[day];
    }

    setDayData(day, data) {
        this.data[day] = data.slice(0,);
        this._updateStorage();
    }

    updateTask(day,n,newTask){
       this.data[day].splice(n,1);
       this.data[day].push(newTask);
       this.data[day].sort(function (a, b)
                {
                    if (a.time > b.time) return 1;
                    if (b.time > a.time) return -1; 
                    return 0;
                });
        this._updateStorage();
    }


    addTask(day, newTask){
        this.data[day].push(newTask);
        this.data[day].sort(function (a, b)
                 {
                     if (a.time > b.time) return 1;
                     if (b.time > a.time) return -1; 
                     return 0;
                 });
         this._updateStorage();
     }


     removeTask(day,n){
        this.data[day].splice(n,1);
        this._updateStorage();
     }


}