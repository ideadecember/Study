export default class Card {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
        this.percentageOfStudy = 0;
    }

    setQuestion(question) {
        this.question = question;
    }

    getQuestion() {
        return this.question;
    }

    setAnswer(answer) {
        this.answer = answer;
    }

    getAnswer() {
        return this.answer;
    }

    setPercentageOfStudy(newPercentage) {
        this.percentageOfStudy = newPercentage;
    }
    
    getPercentageOfStudy() {
        return this.percentageOfStudy;
    }
    
    edit(newQuestion, newAnswer) {
        this.question = newQuestion;
        this.answer = newAnswer;
    }

    editPercentage(progressPercentage) {
        this.percentageOfStudy += progressPercentage;

        if(this.percentageOfStudy < 0) {
            this.percentageOfStudy = 0;
        }

        if(this.percentageOfStudy > 100) {
            this.percentageOfStudy = 100;
        }
    }
} 