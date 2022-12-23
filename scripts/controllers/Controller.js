import DesksMap from "../model/DesksMap.js";
import Render from "../gui/Render.js";
import LearningEngine from "../model/LearningEngine.js";

export default class Controller {
    constructor() {
        this.desksMap = new DesksMap();
        this.render = new Render();
        this.learningEngine = new LearningEngine();
    }

    eventStartScreen() {
        this.render.showElem(document.querySelector('.desks'));
        this.desksMap.download();
        if (this.desksMap.getSize() === 0) {
            this.render.showElem(document.querySelector('.desks__not-created'));
        }
        //*
        let names = this.desksMap.getNames();
        for (let i=0;i<names.length;i++) {
            let name = names[i];
            let percent = this.desksMap.getDesk(name).getPercentageOfStudy();
            this.render.createDeskHtmlElem(name, percent);
        }
        return true;
        //*/
    }

    eventClickAddDesk() {
        this.render.showElem(document.querySelector('.create-desk'));
        this.render.showElem(document.querySelector('.overlay'));
    }

    eventClickCancelCreateDesk() {
        this.render.hideElem(document.querySelector('.create-desk'));
        this.render.hideElem(document.querySelector('.overlay'));
    }

    eventClickOkCreateDesk(name) {
        if (name !== "") {
            if (this.desksMap.addNewDesk(name)) {
                this.render.createDeskHtmlElem(name, 0);
                const createDesk = document.querySelector('.create-desk');
                createDesk.querySelector('.create-desk__input').value = '';
                this.render.hideElem(document.querySelector('.desks__not-created'));
                this.render.hideElem(createDesk);
                this.render.hideElem(document.querySelector('.overlay'));
                return true;
            }
        }
        return false;
    }

    eventClickDeskOptions() {
        this.render.showElem(document.querySelector('.desks__options'));
        this.render.showElem(document.querySelector('.overlay'));
    }
        
    eventClickRenameDesk() {
        this.render.showElem(document.querySelector('.desks__rename-desk'))
        this.render.hideElem(document.querySelector('.desks__options'));
        this.render.showElem(document.querySelector('.overlay'));
    }
    
    eventClickOkRenameDesk(name, newName) {
        if(name !== '' && newName !== '') {
            if(!this.desksMap.rename(name, newName)) {
                return false;
            }
            this.render.hideElem(document.querySelector('.desks__rename-desk'));
            this.render.hideElem(document.querySelector('.overlay'));
            return true;
        }
        return false;
    }

    eventClickCancelRenameDesk() {
        this.render.hideElem(document.querySelector('.desks__rename-desk'));
        this.render.hideElem(document.querySelector('.overlay'));
    }

    eventClickDeleteDesk() {
        this.render.showElem(document.querySelector('.delete-confirm'));
        this.render.hideElem(document.querySelector('.desks__options'));
    }

    eventClickOkDeleteDesk(name) {
        if (name !== "") {
            this.desksMap.delete(name);
            this.render.hideElem(document.querySelector('.delete-confirm'));
            this.render.hideElem(document.querySelector('.overlay'));
        }
    }

    eventClickCancelDeleteDesk() {
        this.render.hideElem(document.querySelector('.delete-confirm'));
        this.render.hideElem(document.querySelector('.overlay'));
    }

    eventClickDeleteCard() {
        this.render.showElem(document.querySelector('.delete-card-confirm'));
        this.render.hideElem(document.querySelector('.cards__options'));
    }

    eventClickOkDeleteCard(name, index) {
        this.desksMap.deleteCard(name, index);
        this.render.clearCards();

        let desk = this.desksMap.getDesk(name);
        for (let i=0;i<desk.getLengthOfCardList();i++) {
            let question = desk.getCard(i).getQuestion();
            let percent = desk.getCardPercentageOfStudy(i);
            this.render.createCardHtmlElem(question,percent,i);
        }

        this.render.hideElem(document.querySelector('.delete-card-confirm'));
        this.render.hideElem(document.querySelector('.overlay'));
    }

    eventClickCancelDeleteCard() {
        this.render.hideElem(document.querySelector('.delete-card-confirm'));
        this.render.hideElem(document.querySelector('.overlay'));
    }

    eventClickDesk(name) {
        this.render.hideElem(document.querySelector('.desks'));
        this.render.clearCards();
        this.render.showElem(document.querySelector('.cards'));
        if (this.desksMap.getSizeOfDesk(name) === 0) {
            this.render.showElem(document.querySelector('.cards__not-created'));
        } else {
            this.render.hideElem(document.querySelector('.cards__not-created'));
        }
        for (let i=0;i<this.desksMap.getSizeOfDesk(name);i++) {
            let question = this.desksMap.getCardQuestion(name, i);
            let percent = this.desksMap.getPercentageOfCard(name, i);
            this.render.createCardHtmlElem(question,percent,i);
        }
        //this.render.enterCardsHtmlElems();
    }

    eventBackToDesks() {
        this.render.hideElem(document.querySelector('.cards'));
        this.render.hideElem(document.querySelector('.create-card'));
        this.render.showElem(document.querySelector('.desks'));
        
    }

    eventClickAddCard() {
        // this.render.hideElem(document.querySelector('.cards'));
        this.render.showElem(document.querySelector('.create-card'));
        this.render.showElem(document.querySelector('.overlay'));
    }

    eventClickCancelCreateCard() {
        this.render.hideElem(document.querySelector('.create-card'));
        this.render.hideElem(document.querySelector('.overlay'));
        this.render.showElem(document.querySelector('.cards'));
    }

    eventClickOkCreateCard(nameDesk, question, answer, index) {
        if (question !== "" && answer !== "") {
            this.render.createCardHtmlElem(question, 0, index);
            this.render.hideElem(document.querySelector('.cards__not-created'));
            this.desksMap.addCard(nameDesk, question, answer, 0);
            this.eventClickCancelCreateCard();
            return true;
        }
        return false;
    }

    eventClickCard(name, index) {
        this.render.hideElem(document.querySelector('.cards'));
        this.render.showElem(document.querySelector('.viewing-mode'));
        let question = this.desksMap.getDesk(name).getCard(index).getQuestion();
        let answer = this.desksMap.getDesk(name).getCard(index).getAnswer();
        this.render.enterInfoCardForView(question, answer);
    }

    eventClickCardOptions() {
        this.render.showElem(document.querySelector('.cards__options'));
        this.render.showElem(document.querySelector('.overlay'));
    }

    eventClickRenameCard(name, index) {
        document.querySelector('.edit-card__input1').value = this.desksMap.getCardQuestion(name, index);
        document.querySelector('.edit-card__input2').value = this.desksMap.getCardAnswer(name, index);
        this.render.hideElem(document.querySelector('.cards__options'));
        this.render.showElem(document.querySelector('.edit-card'));
        this.render.showElem(document.querySelector('.overlay'));
    }

    eventClickOkRenameCard(name, question, answer, index) {
        if (name !== "" && question !== "" && answer !== "" && index < this.desksMap.getDesk(name).getLengthOfCardList()) {
            this.desksMap.editCard(name, question, answer, index)

            this.render.hideElem(document.querySelector('.edit-card'));
            this.render.hideElem(document.querySelector('.overlay'));
            return true;
        }
        return false;
    }

    eventClickCancelRenameCard() {
        this.render.hideElem(document.querySelector('.edit-card'));
        this.render.hideElem(document.querySelector('.overlay'));
    }

    eventClickViewingMode(name) {
        let deskSize = this.desksMap.getSizeOfDesk(name);
        if (name !== "" && deskSize > 0) {
            this.render.hideElem(document.querySelector('.cards'));
            this.render.showElem(document.querySelector('.viewing-mode'));
            if (deskSize > 0) {
                let question = this.desksMap.getCardQuestion(name, 0);
                let answer = this.desksMap.getCardAnswer(name, 0);
                this.render.enterInfoCardForView(question, answer);
                if (deskSize !== 1) {
                    this.render.showElem(document.querySelector('.viewing-mode__buttons'));
                    this.render.showElem(document.querySelector('.button-next'));
                }
            }
            return true;
        }
        return false;
    }

    eventClickPrevForViewingMode(name, index) {
        let desk = this.desksMap.getDesk(name);
        if (index >= 0 && index < desk.getLengthOfCardList()) {
            let question = desk.getCard(index).getQuestion();
            let answer = desk.getCard(index).getAnswer();
            this.render.enterInfoCardForView(question, answer);
            this.render.showElem(document.querySelector('.button-next'));
            if(index === 0) {
                this.render.hideElem(document.querySelector('.button-prev'));
            }
            return true;
        }
        return false;
    }

    eventClickNextForViewingMode(name, index) {
        let desk = this.desksMap.getDesk(name);
        if (index >= 0 && index < desk.getLengthOfCardList()) {
            let question = desk.getCard(index).getQuestion();
            let answer = desk.getCard(index).getAnswer();
            this.render.enterInfoCardForView(question, answer);
            this.render.showElem(document.querySelector('.button-prev'));
            if(index === desk.getLengthOfCardList()-1) {
                this.render.hideElem(document.querySelector('.button-next'));
            }
            return true;
        }
        return false;
    }

    eventClickLearningMode(name) {
        let desk = this.desksMap.getDesk(name);
        if (desk === undefined || desk.getLengthOfCardList() === 0) {
            return false;
        }
        this.learningEngine.setDesk(desk);
        this.render.showQuestion(this.learningEngine.getQuestionCurrentCard())
        return true;
    }

    eventClickShowAnswer() {
        this.render.showAnswer(this.learningEngine.getAnswerCurrentCard());
    }

    eventClickBlockGrades(percent) {
        if ((percent) <= 100 || (percent) >= -100) {
            this.learningEngine.editCardPercentage(this.learningEngine.getIndexCurrentCard(), percent);
            if (this.learningEngine.isEnd()) {
                this.eventBackToCards();
                this.learningEngine.clear();
            } else {
                this.learningEngine.nextCard();
                this.render.showQuestion(this.learningEngine.getQuestionCurrentCard());
            }
            return true;
        }
        return false;
    }

    eventClickSkipQuestion() {
        if (this.learningEngine.isEnd()) {
            this.eventBackToCards();
            this.learningEngine.clear();
        } else {
            this.learningEngine.nextCard();
            this.render.showQuestion(this.learningEngine.getQuestionCurrentCard());
        }
    }

    eventPercentChange(name) {
        const arrayPercentage = [];
        for(let i = 0; i < this.desksMap.getSizeOfDesk(name); i++) {
            arrayPercentage.push(this.desksMap.getPercentageOfCard(name, i));
        }
        this.render.updatePercentagesOfCards(arrayPercentage);
    }

    eventClickHideAllWindows() {
        this.render.hideElem(document.querySelector('.edit-card'));
        this.render.hideElem(document.querySelector('.create-card'));

        this.render.hideElem(document.querySelector('.cards__delete-card-confirm'));
        this.render.hideElem(document.querySelector('.desks__delete-confirm'));
        this.render.hideElem(document.querySelector('.desks__rename-desk'));
        this.render.hideElem(document.querySelector('.desks__create-desk'));
        this.render.hideElem(document.querySelector('.desks__options'));
        this.render.hideElem(document.querySelector('.cards__options'));
        this.render.hideElem(document.querySelector('.overlay'));
    }

    eventBackToCards() {
        this.render.hideElem(document.querySelector('.learning-mode'));
        this.render.hideElem(document.querySelector('.viewing-mode'));
        this.render.showElem(document.querySelector('.cards'));
        this.learningEngine.clear();
    }

    eventUnload() {
        this.desksMap.save();
    }
}