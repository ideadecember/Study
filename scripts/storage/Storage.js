import DesksMapStringFormat from "./stringFormat/DesksMapStringFormat.js";

export default class Storage {
    constructor() {
        this.desksMapStringFormat = new DesksMapStringFormat();
    }

    save(desksMap) {
        // let fileName = '/Users/sloboda/Desktop/OmSU/3_year/5_semester/OOD/StudyCards3/src/f.txt';
        // let fileSysObj = new ActiveXObject('Scripting.FileSystemObject');
        // fileSysObj.CreateTextFile(fileName);

        // let db;
        // let openRequest = indexedDB.open("store", 1);
        // openRequest.onupgradeneeded = function () {
        //     //db.createObjectStore('desks', {keyPath: 'id'});
        //     db = openRequest.result;
        //     if (!db.objectStoreNames.contains('desks')) {
        //         db.createObjectStore('desks', {keyPath: 'id'})
        //     }
        // }
        // let transaction = db.transaction("desks", "readwrite");
        // let d = transaction.objectStore("desks");
        // let request = d.put(this.desksMapStringFormat.desksMapToString(desksMap), 1);

        localStorage.setItem('desks', this.desksMapStringFormat.desksMapToString(desksMap));
    }
    
    download() {
        // let db;
        // let openRequest = indexedDB.open("store", 1);
        // openRequest.onupgradeneeded = function () {
        //     //db.createObjectStore('desks', {keyPath: 'id'});
        //     db = openRequest.result;
        //     if (!db.objectStoreNames.contains('desks')) {
        //         db.createObjectStore('desks', {keyPath: 'id'})
        //     }
        // }
        // let transaction = db.transaction("desks", "readwrite");
        // let d = transaction.objectStore("desks");
        // d.get(1);
        // console.log(d);

        if(localStorage.getItem('desks')) {
            return this.desksMapStringFormat.stringToDesksMap(localStorage.getItem('desks'));
        }
    }
}