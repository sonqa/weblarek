import { Component } from '../base/Component';

export abstract class ProductCard<T> extends Component<T> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this._title = container.querySelector('.card__title') as HTMLElement;
        this._price = container.querySelector('.card__price') as HTMLElement;
    }

    set title(value: string) {
        if (this._title) this.setText(this._title, value);
    }

    set price(value: number | null) {
        if (this._price) {
            this.setText(this._price, value === null ? 'Недоступно' : `${value} синапсов`);
        }
    }

    // Переопределяем render, чтобы он принимал Partial<T>
    render(data?: Partial<T>): HTMLElement {
        if (data) {
            Object.assign(this, data);
        }
        return this.container;
    }
}