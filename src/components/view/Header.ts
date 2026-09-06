import { Component } from '../base/Component';
import { EventEmitter } from '../base/Events';

export class Header extends Component<{ cartCount: number }> {
    private _cartCounter: HTMLElement;
    private _cartButton: HTMLButtonElement;
    private _events: EventEmitter;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this._events = events;
        
        this._cartCounter = container.querySelector('.header__basket-counter') as HTMLElement;
        this._cartButton = container.querySelector('.header__basket') as HTMLButtonElement;

        if (this._cartButton) {
            this._cartButton.addEventListener('click', (event) => {
                event.preventDefault();
                console.log('🛒 Клик по корзине!');
                this._events.emit('cart:open');
            });
        } else {
            console.warn('⚠️ Кнопка .header__basket не найдена!');
        }
    }

    set cartCount(value: number) {
        if (this._cartCounter) {
            this._cartCounter.textContent = String(value);
        }
    }

    render(data: { cartCount: number }): HTMLElement {
        this.cartCount = data.cartCount;
        return this.container;
    }
}