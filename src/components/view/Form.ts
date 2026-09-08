import { Component } from '../base/Component';
import { EventEmitter } from '../base/Events';

export abstract class Form<T> extends Component<T> {
    protected _events: EventEmitter;
    protected _submitButton: HTMLButtonElement;
    protected _error: HTMLElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this._events = events;
        this._submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;
        this._error = container.querySelector('.form__errors') as HTMLElement;

        container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.onSubmit();
        });
    }

    set valid(value: boolean) {
        if (this._submitButton) {
            this._submitButton.disabled = !value;
        }
    }

    set errors(value: string) {
        if (this._error) {
            this._error.textContent = value;
        }
    }

    protected abstract onSubmit(): void;
}