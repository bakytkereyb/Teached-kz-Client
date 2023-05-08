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
}