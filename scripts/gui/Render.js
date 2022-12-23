import Elem from './Elem.js'

export default class Render {
    constructor() {
        this.desksWrap = document.querySelector('.desks__wrap');
        this.cardsWrap = document.querySelector('.cards__wrap');
    }
    
    showElem(elem) {
        elem.classList.add('_active');
    }
    
    hideElem(elem) {
        elem.classList.remove('_active');
    }

    showQuestion(question) {
        document.querySelector('.learning-mode__draft').value = "";
        this.hideElem(document.querySelector('.cards'));
        this.hideElem(document.querySelector('.learning-mode__answer'));
        this.hideElem(document.querySelector('.learning-mode__block-grades'));
        this.showElem(document.querySelector('.learning-mode'));
        this.showElem(document.querySelector('.learning-mode__draft'));
        this.showElem(document.querySelector('.learning-mode__buttons'));
        document.querySelector('.learning-mode__question').textContent = question;
    }

    showAnswer(answer) {
        this.hideElem(document.querySelector('.learning-mode__draft'));
        this.hideElem(document.querySelector('.learning-mode__buttons'));
        this.showElem(document.querySelector('.learning-mode__answer'));
        document.querySelector('.learning-mode__answer').textContent = answer;
        this.showElem(document.querySelector('.learning-mode__block-grades'));
    }

    createDeskHtmlElem(name, percent) {
        const deskLine = new Elem('div', 'desks__desk desk', this.desksWrap).elem;
        const deskName = new Elem('div', 'desk__name', deskLine).elem;
        deskName.textContent = name;
        const wrapInfo = new Elem('div', 'desk__wrap-info', deskLine).elem;
        const deskPercent = new Elem('div', 'desk__percent', wrapInfo).elem;
        deskPercent.textContent = percent + "%";
        const deskOptions = new Elem('div', 'desk__options', wrapInfo).elem;
    }

    createCardHtmlElem(question, percent, id) {
        const cardLine = new Elem('div', 'cards__card card', this.cardsWrap).elem;
        cardLine.id = id;
        const cardQuestion = new Elem('div', 'card__question', cardLine).elem;
        cardQuestion.textContent = question;
        const wrapInfo = new Elem('div', 'card__wrap-info', cardLine).elem;
        const cardPercent = new Elem('div', 'card__percent', wrapInfo).elem;
        cardPercent.textContent = percent + "%";
        const cardOptions = new Elem('div', 'card__options', wrapInfo).elem;
    }

    enterDesksHtmlElem(names) {
        names.forEach((name) => {
            this.createDeskHtmlElem(name, 0);
        });
    }

    enterInfoCardForView(question, answer) {
        document.querySelector('.viewing-mode__question').textContent = question;
        document.querySelector('.viewing-mode__answer').textContent = answer;
    }

    updatePercentagesOfCards(arrayPercentage) {
        const cardsPercentages = document.querySelectorAll('.card__percent');
        for(let i = 0; i < cardsPercentages.length; i++) {
            cardsPercentages[i].textContent = arrayPercentage[i] + "%";
        }
    }

    clearDesks() {
        document.querySelector('.desks__wrap').textContent = '';
    }

    clearCards() {
        document.querySelector('.cards__wrap').textContent = '';
    }
}