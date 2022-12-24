import Card from "../../model/Card.js";

export default class CardStringFormat {
    constructor() {

    }

    //Для преобразования Card в строку.
    cardToString(card) {
        return '{"question":"'+card.getQuestion()+'","answer":"'+card.getAnswer()+'","percentage":'+card.getPercentageOfStudy()+'}';
    }

    //Для преобразования строки в Card.
    stringToCard(str) {
        let obj = JSON.parse(str);
        let card = new Card(obj.question, obj.answer);
        card.setPercentageOfStudy(obj.percentage);
        console.log(card);
        return card;
    }
}