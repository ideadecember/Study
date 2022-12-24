export default class Elem {
    constructor(tag, className, parent) {
        //console.log(parent);
        this.newElem = document.createElement(tag);
        this.newElem.className = className;
        parent.append(this.newElem);
    }

    get elem() {
        return this.newElem;
    }
}