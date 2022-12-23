import DesksMap from "../../model/DesksMap.js";
import DeskStringFormat from "./DeskStringFormat.js";
import Desk from "../../model/Desk.js";

export default class DesksMapStringFormat {
    constructor() {
        this.deskStringFormat = new DeskStringFormat();
    }

    //Для преобразования DesksMap в строку.
    desksMapToString(desksMap) {
        let str = '[';
        let names = desksMap.getNames();
        for(let i=0;i<names.length;i++) {
            //console.log(desksMap);
            //console.log(desksMap.getDesk(names[i]));
            str += this.deskStringFormat.deskToString(desksMap.getDesk(names[i]));
            if (i<(names.length-1)) {
                str += ',';
            }
        }
        return str + ']';
    }

    //Для преобразования строки в DesksMap.
    stringToDesksMap(str) {
        let obj = JSON.parse(str);
        let desksMap = new DesksMap();
        obj.forEach((objDesk) => {
            //console.log(objDesk);
            //let desk = this.dtoToDesk(dtoDesk);
            let desk = new Desk(objDesk.name);
            objDesk.cards.forEach((card) => {
                desk.addCard(card.question, card.answer, card.percentage);
            });
            desk.setPercentageOfStudy();
            //console.log(desk);
            desksMap.addDesk(objDesk.name, desk);
        });
        return desksMap;
    }

    //Для преобразования Names в json.
    namesToString(names) {
        return JSON.stringify(names);
    }

    //Для преобразования json в Names.
    stringToNames(str) {
        return JSON.parse(str);
    }
}