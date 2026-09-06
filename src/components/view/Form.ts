import { Component } from '../base/Component';
import { EventEmitter } from '../base/Events';

export abstract class Form<T> extends Component<T> {
    protected _events: EventEmitter;
    protected _submitButton: HTMLButtonElement;
    protected _error: HTMLElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this._events = events;
        
        this._submitButton = container.querySelector('.form__submit, .order__button, button[type="submit"]') as HTMLButtonElement;
        this._error = container.querySelector('.form__errors') as HTMLElement;

        if (!this._submitButton) {
            console.warn('⚠️ Кнопка submit не найдена в форме');
        } else {
            console.log('✅ Кнопка submit найдена:', this._submitButton);
        }

        container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });

        container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            console.log('📝 Форма отправлена');
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

    protected onInputChange(field: keyof T, value: string): void {
        this._events.emit('form:change', { field, value });
    }

    protected abstract onSubmit(): void;
}