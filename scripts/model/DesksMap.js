import Desk from "./Desk.js";
import Storage from "../storage/Storage.js";

export default class DesksMap {
    constructor() {
        this.desks = new Map();
        this.names = [];
        this.storage = new Storage();
    }

    getNames() {
        return this.names;
    }

    getDesk(name) {
        return this.desks.get(name);
    }

    addNewDesk(name) {
        if(this.desks.get(name) !== undefined) {
            return false;
        }
        this.desks.set(name, new Desk(name));
        this.names.push(name);
        return true;
    }

    addDesk(name, desk) {
        if(this.desks.get(name) !== undefined) {
            return false;
        }
        this.desks.set(name, desk);
        this.names.push(name);
        return true;
    }

    //name?
    delete(name) {
        this.desks.delete(name);
        this.removeName(name);
    }

    addCard(name, question, answer, percentage) {
        let desk = this.desks.get(name);
        desk.addCard(question, answer, percentage);
        desk.setPercentageOfStudy();
    }

    deleteCard(name, index) {
        this.desks.get(name).deleteCard(index);
    }

    editCard(name, question, answer, index) {
        this.desks.get(name).editCard(index, question, answer);
    }

    getCardQuestion(name, index) {
        return this.desks.get(name).getCardQuestion(index);
    }

    getCardAnswer(name, index) {
        return this.desks.get(name).getCardAnswer(index);
    }

    getSizeOfDesk(name) {
        return this.desks.get(name).getLengthOfCardList();
    }

    getPercentageOfCard(name, index) {
        return this.desks.get(name).getCardPercentageOfStudy(index);
    }
    
    getSize() {
        return this.desks.size;
    }

    removeName(name) {
        this.names.splice(this.getNameIndex(name),1);
    }

    getNameIndex(name) {
        for (let i=0;i<this.names.length;i++) {
            if(this.names[i] === name) {
                return i;
            }
        }
        return -1;
    }

    rename(name, newName) {
        if(!this.isNameRepeated(newName)) {
            const desk = this.desks.get(name);
            this.desks.delete(name);
            desk.setName(newName);
            this.desks.set(newName, desk);
            this.names[this.getNameIndex(name)] = newName;

            return true;
        }

        return false;
    }

    isNameRepeated(name) {
        if(this.names.includes(name)) {
            return true;
        }

        return false;
    }

    save() {
        this.storage.save(this);
    }

    download() {
        let dm = this.storage.download();
        if(dm) {
            dm.getNames().forEach((n) => {
                let de =  dm.getDesk(n);
                this.addDesk(n, de);
            });
        }
    }
}

