import { Component } from '../base/Component';

export class ProductCardCart extends Component<{ id: string; title: string; price: number }> {
    private _title: HTMLElement;
    private _price: HTMLElement;
    private _deleteButton: HTMLButtonElement;
    private _indexElement?: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this._title = container.querySelector('.card__title') as HTMLElement;
        this._price = container.querySelector('.card__price') as HTMLElement;
        this._deleteButton = container.querySelector('.card__button') as HTMLButtonElement;
        this._indexElement = container.querySelector('.basket__item-index') as HTMLElement || undefined;
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    set setIndex(value: number) {
        if (this._indexElement) {
            this._indexElement.textContent = String(value);
        }
    }

    set title(value: string) {
        if (this._title) {
            this.setText(this._title, value);
        }
    }

    set price(value: number) {
        if (this._price) {
            this.setText(this._price, `${value} синапсов`);
        }
    }

    set onDelete(callback: () => void) {
        if (this._deleteButton) {
            this._deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                callback();
            });
        }
    }

    render(data: { id: string; title: string; price: number }): HTMLElement {
        this.id = data.id;
        this.title = data.title;
        this.price = data.price;
        return this.container;
    }
}