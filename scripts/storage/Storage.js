import DesksMapStringFormat from "./stringFormat/DesksMapStringFormat.js";

export default class Storage {
    constructor() {
        this.desksMapStringFormat = new DesksMapStringFormat();
    }

    save(desksMap) {
        localStorage.setItem('desks', this.desksMapStringFormat.desksMapToString(desksMap));
    }
    
    download() {
        //console.log(this.desksMapStringFormat.stringToDesksMap(localStorage.getItem('desks')));
        if(localStorage.getItem('desks')) {
            return this.desksMapStringFormat.stringToDesksMap(localStorage.getItem('desks'));
        }
    }
}