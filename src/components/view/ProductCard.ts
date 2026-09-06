import { Component } from '../base/Component';

export abstract class ProductCard<T> extends Component<T> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _category: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _button?: HTMLButtonElement;
    protected _categoryMap: Record<string, string>;

    constructor(container: HTMLElement, categoryMap: Record<string, string>) {
        super(container);
        this._categoryMap = categoryMap;
        
        this._title = container.querySelector('.card__title') as HTMLElement;
        this._price = container.querySelector('.card__price') as HTMLElement;
        this._category = container.querySelector('.card__category') as HTMLElement;
        this._image = container.querySelector('.card__image') as HTMLImageElement || undefined;
        this._button = container.querySelector('.card__button') as HTMLButtonElement || undefined;
    }

    set title(value: string) {
        if (this._title) this.setText(this._title, value);
    }

    set price(value: number | null) {
        if (this._price) {
            this.setText(this._price, value === null ? 'Недоступно' : `${value} синапсов`);
        }
    }

    set category(value: string) {
        if (this._category) {
            this.setText(this._category, value);
            // Используем готовый класс из categoryMap
            const categoryClass = this._categoryMap[value] || 'card__category_other';
            this._category.className = categoryClass;
        }
    }

    set image(value: string) {
        if (this._image) {
            this.setImage(this._image, value, this._title?.textContent || '');
        }
    }

    set buttonText(value: string) {
        if (this._button) this.setText(this._button, value);
    }

    set buttonDisabled(value: boolean) {
        if (this._button) this._button.disabled = value;
    }

    set onClick(callback: () => void) {
        this.container.addEventListener('click', callback);
    }

    set onButtonClick(callback: () => void) {
        if (this._button) {
            this._button.addEventListener('click', (e) => {
                e.stopPropagation();
                callback();
            });
        }
    }
}