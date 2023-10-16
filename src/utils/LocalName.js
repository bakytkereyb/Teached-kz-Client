export class LocalName {
    static getName(item) {
        if (localStorage.getItem('lan') === "РУС") {
            return item?.nameRu;
        }
        if (localStorage.getItem('lan') === "ҚАЗ") {
            return item?.nameKz;
        }
        return item?.name;
    }

    static getDescription(item) {
        if (localStorage.getItem('lan') === "РУС") {
            return item?.descriptionRu;
        }
        if (localStorage.getItem('lan') === "ҚАЗ") {
            return item?.descriptionKz;
        }
        return item?.description;
    }

    static getQuestionText(item) {
        if (localStorage.getItem('lan') === "РУС") {
            return item?.questionRu;
        }
        if (localStorage.getItem('lan') === "ҚАЗ") {
            return item?.questionKz;
        }
        return item?.question;
    }

    static getAnswerText(item) {
        if (localStorage.getItem('lan') === "РУС") {
            return item?.answerRu;
        }
        if (localStorage.getItem('lan') === "ҚАЗ") {
            return item?.answerKz;
        }
        return item?.answer;
    }
}