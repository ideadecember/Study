import Card from "./Card.js";

export default class Desk {
    constructor(name) {
        this.name = name;
        this.percentageOfStudy = 0;
        this.cards = [];
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setPercentageOfStudy() {
        if(this.getLengthOfCardList() === 0) {
            this.percentageOfStudy = 0;
            return;
        }
        let sumPercentages = 0;
        this.cards.forEach((card) => {
            sumPercentages += card.getPercentageOfStudy();
        })

        this.percentageOfStudy = Math.round(sumPercentages / this.getLengthOfCardList());
    }

    getPercentageOfStudy() {
        return this.percentageOfStudy;
    }

    getCardPercentageOfStudy(index) {
        return this.cards[index].getPercentageOfStudy();
    }
    
    getCards() {
        return this.cards;
    }

    getLengthOfCardList() {
        return this.cards.length;
    }

    getCard(index) {
        return this.cards[index];
    }

    deleteCard(index) {
        this.cards.splice(index, 1);
    }

    getCardQuestion(index) {
        return this.cards[index].getQuestion();
    }

    getCardAnswer(index) {
        return this.cards[index].getAnswer();
    }

    addCard(question, answer, percent) {
        let card = new Card(question, answer);
        card.setPercentageOfStudy(percent);
        this.cards.push(card);
    }

    editCard(index, question, answer) {
        this.cards[index].edit(question, answer);
    }

    editCardPercentage(index, progressPercentage) {
        this.cards[index].editPercentage(progressPercentage);
        this.setPercentageOfStudy();
    }
}