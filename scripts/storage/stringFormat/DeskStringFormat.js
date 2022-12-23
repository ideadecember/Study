import Desk from "../../model/Desk.js";
import CardStringFormat from "./CardStringFormat.js";

export default class DeskStringFormat {
    constructor() {
        this.cardStringFormat = new CardStringFormat();
    }

    //Для преобразования Desk в строку.
    deskToString(desk) {
        let str = '{"name":"'+desk.getName()+'","percentage":'+desk.getPercentageOfStudy()+',"cards":[';
        for (let i=0;i<desk.getLengthOfCardList();i++) {
            str += this.cardStringFormat.cardToString(desk.getCard(i));
            if (i<(desk.getLengthOfCardList()-1)) {
                str += ',';
            }
        }
        return str + ']}';
    }

    //Для преобразования строки в Desk.
    stringToDesk(str) {
        let obj = JSON.parse(str);
        let desk = new Desk(obj.name);
        obj.cards.forEach((card) => {
            desk.addCard(card.question, card.answer, card.percentage);
        });
        desk.setPercentageOfStudy();
        return desk;
    }
}