import { Component } from '../base/Component';
import { EventEmitter } from '../base/Events';

export class OrderSuccess extends Component<{ total: number }> {
    private _message: HTMLElement;
    private _closeButton: HTMLButtonElement;
    private _events: EventEmitter;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this._events = events;
        this._message = container.querySelector('.order-success__description') as HTMLElement;
        this._closeButton = container.querySelector('.order-success__close') as HTMLButtonElement;

        if (this._closeButton) {
            this._closeButton.addEventListener('click', () => {
                this._events.emit('success:close');
            });
        }
    }

    set total(value: number) {
        if (this._message) {
            this._message.textContent = `Списано ${value} синапсов`;
        }
    }

    render(data: { total: number }): HTMLElement {
        this.total = data.total;
        return this.container;
    }
}