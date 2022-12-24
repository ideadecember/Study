import Controller from "./controllers/Controller.js";

/*
export default class App {
    constructor() {
        this.controller = new Controller();
    }

    main() {}
}
//*/

window.onload = function () {
    //let app = new App();
    //app.main();
    let selectedDeskName;
    let selectedDeskHtmlElem;
    const controller = new Controller();
    let idSelectedCard;
    let selectedCardHtmlElem;
    let idCurrentCardForView;

    controller.eventStartScreen();

    document.querySelectorAll('.desk').forEach((desk) => {
        let name = desk.querySelector('.desk__name').textContent;
        desk.addEventListener('click', function () {
            controller.eventClickDesk(name);
            selectedDeskName = name;
            document.querySelector('.cards__name-desk').textContent = name;
            addEventOnCardsOptions();
            addEventOnCards();
        }, false);
        //на настройки колоды
        desk.querySelector('.desk__options').addEventListener('click', function (e) {
            e.stopPropagation();
            controller.eventClickDeskOptions();
            selectedDeskHtmlElem = e.target.closest('.desk');
            selectedDeskName = name;
        }, false);
    });

    document.querySelector('.desks__btn').addEventListener('click', function () {
        controller.eventClickAddDesk();
    }, false);

    document.querySelector('.create-desk__cancel').addEventListener('click', function () {
        controller.eventClickCancelCreateDesk();
    }, false);

    document.querySelector('.create-desk__ok').addEventListener('click', function () {
        const name = document.querySelector('.create-desk__input').value;
        if(controller.eventClickOkCreateDesk(name)) {
            //на колоду
            const desks = document.querySelectorAll('.desks__desk');
            desks.item(desks.length - 1).addEventListener('click', function () {
                controller.eventClickDesk(name);
                selectedDeskName = name;
                document.querySelector('.cards__name-desk').textContent = name;
            }, false);
            //на настройки колоды
            desks.item(desks.length - 1).querySelector('.desk__options').addEventListener('click', function (e) {
                e.stopPropagation();
                controller.eventClickDeskOptions();
                //selectedDeskName = e.target.closest('.desk').querySelector('.desk__name').textContent;
                selectedDeskHtmlElem = e.target.closest('.desk');
                selectedDeskName = name;
            }, false);
        }
    }, false);

    document.querySelector('.options__rename-desk').addEventListener('click', function () {
        controller.eventClickRenameDesk();
    }, false);

    document.querySelector('.rename-desk__ok').addEventListener('click', function() {
        const inputDesk = document.querySelector('.rename-desk__input');
        if(controller.eventClickOkRenameDesk(selectedDeskName, inputDesk.value)) {
            selectedDeskHtmlElem.querySelector('.desk__name').textContent = inputDesk.value;
            inputDesk.value = '';
        }
    }, false);

    document.querySelector('.rename-desk__cancel').addEventListener('click', function() {
        controller.eventClickCancelRenameDesk();
    }, false);

    document.querySelector('.options__delete-desk').addEventListener('click', function () {
        controller.eventClickDeleteDesk();
    }, false);

    document.querySelector('.delete-confirm__ok').addEventListener('click', function () {
        selectedDeskHtmlElem.remove();
        controller.eventClickOkDeleteDesk(selectedDeskName);
    }, false);

    document.querySelector('.delete-confirm__cancel').addEventListener('click', function () {
        controller.eventClickCancelDeleteDesk();
    }, false);

    document.querySelector('.options__delete-card').addEventListener('click', function () {
        controller.eventClickDeleteCard();
    }, false);

    document.querySelector('.delete-card-confirm__ok').addEventListener('click', function () {
        controller.eventClickOkDeleteCard(document.querySelector('.cards__name-desk').textContent, parseInt(idSelectedCard));
        addEventOnCardsOptions();
        addEventOnCards();
    }, false);

    document.querySelector('.delete-card-confirm__cancel').addEventListener('click', function () {
        controller.eventClickCancelDeleteCard();
    }, false);

    document.querySelector('.cards__come-back').addEventListener('click', function() {
        controller.eventBackToDesks();
    }, false);

    document.querySelector('.cards__btn').addEventListener('click', function () {
        controller.eventClickAddCard();
    }, false);

    document.querySelector('.create-card__cancel').addEventListener('click', function () {
        controller.eventClickCancelCreateCard();
    }, false);

    document.querySelector('.create-card__ok').addEventListener('click', function () {
        let question = document.querySelector('.create-card__input1').value;
        document.querySelector('.create-card__input1').value = "";
        let answer = document.querySelector('.create-card__input2').value;
        document.querySelector('.create-card__input2').value = "";
        let cards = document.querySelectorAll('.cards__card');
        if (controller.eventClickOkCreateCard(selectedDeskName, question, answer, cards.length)) {
            let card = document.querySelectorAll('.cards__card').item(cards.length);
            addEventOnCard(card);
            addEventOnCardOptions(card.querySelector('.card__options'));
        }
    });

    document.querySelector('.options__rename-card').addEventListener('click', function () {
        controller.eventClickRenameCard(selectedDeskName, idSelectedCard);
    }, false);

    document.querySelector('.edit-card__ok').addEventListener('click', function () {
        let nameDesk = document.querySelector('.cards__name-desk').textContent;
        let question = document.querySelector('.edit-card__input1').value;
        document.querySelector('.edit-card__input1').value = "";
        let answer = document.querySelector('.edit-card__input2').value;
        document.querySelector('.edit-card__input2').value = "";
        if (controller.eventClickOkRenameCard(nameDesk, question, answer, idSelectedCard)) {
            selectedCardHtmlElem.querySelector('.card__question').textContent = question;
        }
        addEventOnCardsOptions();
        addEventOnCards();
    }, false);

    document.querySelector('.edit-card__cancel').addEventListener('click', function () {
        controller.eventClickCancelRenameCard();
    }, false);

    document.querySelector('.buttons__learn').addEventListener('click', function () {
        if (!controller.eventClickLearningMode(document.querySelector('.cards__name-desk').textContent)) {
            alert("В колоде нет карточек для изучения");
        }
    }, false);

    document.querySelector('.learning-mode__view-answer').addEventListener('click', function () {
        controller.eventClickShowAnswer();
    }, false);

    document.querySelector('.learning-mode__block-grades').addEventListener('click', function (e) {
        controller.eventClickBlockGrades(Number(e.target.dataset.complexity));
        controller.eventPercentChange(selectedDeskName);
    }, false);

    document.querySelector('.learning-mode__skip-question').addEventListener('click', function (e) {
        controller.eventClickSkipQuestion();
    }, false);

    document.querySelector('.learning-mode__come-back').addEventListener('click', function () {
        controller.eventBackToCards();
        controller.eventPercentChange(selectedDeskName);
    }, false);

    document.querySelector('.buttons__view').addEventListener('click', function () {
        if (controller.eventClickViewingMode(selectedDeskName)) {
            idCurrentCardForView = 0;
        } else {
            alert("В колоде нет карточек для просмотра");
        }
    }, false);

    document.querySelector('.button-prev').addEventListener('click', function () {
        if (controller.eventClickPrevForViewingMode(selectedDeskName, idCurrentCardForView-1)) {
            idCurrentCardForView--;
        } else {
            idCurrentCardForView++;
        }
    }, false);
    document.querySelector('.button-next').addEventListener('click', function () {
        if (controller.eventClickNextForViewingMode(selectedDeskName, idCurrentCardForView+1)) {
            idCurrentCardForView++;
        } else {
            idCurrentCardForView--;
        }
    }, false);

    document.querySelector('.viewing-mode__come-back').addEventListener('click', function () {
        controller.eventBackToCards();
    }, false);
    document.querySelector('.overlay').addEventListener('click', function () {
        controller.eventClickHideAllWindows();
    }, false);

    window.addEventListener('unload', function (e) {
        controller.eventUnload();
        e.preventDefault();
    }, false);

    function addEventOnCardOptions(cardOptionsHtmlElem) {
        cardOptionsHtmlElem.addEventListener('click', function (e) {
            e.stopPropagation();
            controller.eventClickCardOptions();
            idSelectedCard = e.target.closest('.card').id;
            selectedCardHtmlElem = e.target.closest('.card');
        }, false);
    }

    function addEventOnCardsOptions() {
        document.querySelectorAll('.card__options').forEach((cardOpt) => {
            cardOpt.addEventListener('click', function (e) {
                e.stopPropagation();
                controller.eventClickCardOptions();
                idSelectedCard = e.target.closest('.card').id;
                selectedCardHtmlElem = e.target.closest('.card');
            }, false);
        });
    }

    function addEventOnCard(cardHtmlElem) {
        cardHtmlElem.addEventListener('click', function (e) {
            e.stopPropagation();
            controller.eventClickCard(selectedDeskName, e.target.id);
        });
    }

    function addEventOnCards() {
        document.querySelectorAll('.card').forEach((card) => {
           card.addEventListener('click', function (e) {
               e.stopPropagation();
               console.log(e.target)
               let nameDesk = document.querySelector('.cards__name-desk').textContent;
               controller.eventClickCard(nameDesk, e.target.id);
           }, false);
        });
    }
}