import { Form } from './Form';
import { EventEmitter } from '../base/Events';
import { IBuyer } from '../../types';

export class ContactsForm extends Form<IBuyer> {
    private _emailInput: HTMLInputElement;
    private _phoneInput: HTMLInputElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        this._emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
        this._phoneInput = container.querySelector('input[name="phone"]') as HTMLInputElement;

        if (this._emailInput) {
            this._emailInput.addEventListener('input', () => {
                this._events.emit('contacts:emailChange', { email: this._emailInput.value });
            });
        }
        if (this._phoneInput) {
            this._phoneInput.addEventListener('input', () => {
                this._events.emit('contacts:phoneChange', { phone: this._phoneInput.value });
            });
        }
    }

    set email(value: string) {
        if (this._emailInput) {
            this._emailInput.value = value;
        }
    }

    set phone(value: string) {
        if (this._phoneInput) {
            this._phoneInput.value = value;
        }
    }

    protected onSubmit(): void {
        this._events.emit('contacts:submit');
    }

    render(): HTMLElement {
        return this.container;
    }
}