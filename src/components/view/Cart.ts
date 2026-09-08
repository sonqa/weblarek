import { Component } from '../base/Component';
import { EventEmitter } from '../base/Events';

export class Cart extends Component<{ items: HTMLElement[]; totalPrice: number; isEmpty: boolean }> {
    private _items: HTMLElement;
    private _totalPrice: HTMLElement;
    private _checkoutButton: HTMLButtonElement;
    private _events: EventEmitter;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this._events = events;
        this._items = container.querySelector('.basket__list') as HTMLElement;
        this._totalPrice = container.querySelector('.basket__price') as HTMLElement;
        this._checkoutButton = container.querySelector('.basket__button') as HTMLButtonElement;

        if (this._checkoutButton) {
            this._checkoutButton.addEventListener('click', () => {
                this._events.emit('cart:checkout');
            });
        }
    }

    set items(value: HTMLElement[]) {
        if (this._items) {
            this._items.replaceChildren(...value);
        }
    }

    set totalPrice(value: number) {
        if (this._totalPrice) {
            this._totalPrice.textContent = `${value} синапсов`;
        }
    }

    set canCheckout(value: boolean) {
        if (this._checkoutButton) {
            this._checkoutButton.disabled = !value;
        }
    }

    set isEmpty(value: boolean) {
        if (this._items) {
            this._items.style.display = value ? 'none' : 'block';
        }
        if (this._checkoutButton) {
            this._checkoutButton.disabled = value;
        }
    }

    render(): HTMLElement {
        return this.container;
    }
}