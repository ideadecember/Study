export default class LearningEngine {
    constructor() {
        this.desk = null;
        this.indexCurrentCard = 0;
    }

    setDesk(desk) {
        this.desk = desk;
    }

    nextCard() {
        this.indexCurrentCard++;
    }

    getIndexCurrentCard() {
        return this.indexCurrentCard;
    }

    editCardPercentage(index, progressPercentage) {
        this.desk.editCardPercentage(index, progressPercentage);
    }

    getQuestionCurrentCard() {
        return this.desk.getCardQuestion(this.indexCurrentCard);
    }

    getAnswerCurrentCard() {
        return this.desk.getCardAnswer(this.indexCurrentCard);
    }

    isEnd() {
        if(this.indexCurrentCard === (this.desk.getLengthOfCardList() - 1)) {
            return true;
        }
        return false;
    }

    clear() {
        this.desk = null;
        this.indexCurrentCard = 0;
    }
}