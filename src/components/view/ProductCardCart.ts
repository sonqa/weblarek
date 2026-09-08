import { ProductCard } from './ProductCard';

export class ProductCardCart extends ProductCard<{ 
    title: string; 
    price: number; 
    index: number;
}> {
    private _deleteButton: HTMLButtonElement;
    private _indexElement?: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this._deleteButton = container.querySelector('.card__button') as HTMLButtonElement;
        this._indexElement = container.querySelector('.basket__item-index') as HTMLElement || undefined;
    }

    set index(value: number) {
        if (this._indexElement) {
            this._indexElement.textContent = String(value);
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

    render(data: { title: string; price: number; index: number }): HTMLElement {
        this.title = data.title;
        this.price = data.price;
        this.index = data.index;
        return this.container;
    }
}