export class factoryMenu {
    #HTMLDialog: HTMLDialogElement;
    #HTMLList;

    constructor() {
        this.#HTMLDialog = document.getElementById('factory-menu') as HTMLDialogElement;
        this.#HTMLList = this.#HTMLDialog.children[0];
    }

    open() {
        this.#HTMLDialog.showModal();
    }
}