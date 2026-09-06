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
            this._emailInput.addEventListener('input', () => this.checkValidity());
        }
        if (this._phoneInput) {
            this._phoneInput.addEventListener('input', () => this.checkValidity());
        }
    }

    set email(value: string) {
        if (this._emailInput) {
            this._emailInput.value = value;
            this.checkValidity();
        }
    }

    set phone(value: string) {
        if (this._phoneInput) {
            this._phoneInput.value = value;
            this.checkValidity();
        }
    }

    private checkValidity(): void {
        const isValid = this._emailInput?.value.trim() !== '' && this._phoneInput?.value.trim() !== '';
        this.valid = isValid;
    }

    protected onSubmit(): void {
        console.log('📝 Форма контактов отправлена');
        if (this._emailInput?.value.trim() && this._phoneInput?.value.trim()) {
            this._events.emit('contacts:submit', {
                email: this._emailInput.value.trim(),
                phone: this._phoneInput.value.trim(),
                address: '',
                payment: ''
            } as IBuyer);
        }
    }

    render(data?: Partial<IBuyer>): HTMLElement {
        if (data?.email !== undefined) {
            this.email = data.email;
        }
        if (data?.phone !== undefined) {
            this.phone = data.phone;
        }
        return this.container;
    }
}