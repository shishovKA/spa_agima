class Storage {

    constructor (localStorage,startData) {
        this.storage = localStorage;
        this.length = this.storage.length;
        this._firstload = this._firstload.bind(this);
        this._updateStorage = this._updateStorage.bind(this);
        this._getStorageData = this._getStorageData.bind(this);
        this.getDayData = this.getDayData.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.removeTask = this.removeTask.bind(this);

        this._firstload(startData);
    }

    _firstload(startData) {
        if (this.length !== 0) {
            this._getStorageData();
        }

        else {
            this.data = startData;
            this._updateStorage();
        }
    }

    _updateStorage() {
        this.storage.clear();
        this.storage.data = JSON.stringify(this.data);
    }

    _getStorageData() {
        this.data = JSON.parse(this.storage.data);
    }

    getDayData(day) {
        return this.data[day];
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

    /*
    insertNewPost(number, post) {
        this.data.splice(number, 0, post);
        this._refresh();
    }


    removePost(number) {
        this.data.splice(number-1, 1);
        this._refresh();
    }

    getId() {
        this.idCounter = this.data.reduce(function(sum, current) {
            if (current.id>sum) {return current.id}
            return sum;
          }, 0);
        return this.idCounter+1
    }

    getStartdata(startData) {
        startData.forEach(item => {
          item.id = this.idCounter;
          this.idCounter = this.idCounter+1;
          this.data.push(item); 
        });
    this._refresh();
    }

    _refresh() {
        this.storage.clear();
        this.storage.data = JSON.stringify(this.data);
    }

    updateElmentById(id,newValue){
        const result = this.data.findIndex(item => {
            return item.id == id;
          });

        if (this.data[result].hasOwnProperty('textValue')) {this.data[result].textValue=newValue;}
        if (this.data[result].hasOwnProperty('link')) {this.data[result].link=newValue;}

        this._refresh();
    }

    */

}