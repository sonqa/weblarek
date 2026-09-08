import { Form } from './Form';
import { EventEmitter } from '../base/Events';
import { IOrderData, TPayment, TPaymentWithEmpty } from '../../types';

export class OrderForm extends Form<IOrderData> {
    private _paymentButtons: NodeListOf<HTMLButtonElement>;
    private _addressInput: HTMLInputElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        this._paymentButtons = container.querySelectorAll('.button_alt');
        this._addressInput = container.querySelector('input[name="address"]') as HTMLInputElement;

        this._paymentButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const value = button.getAttribute('name') as TPayment;
                if (value === 'card' || value === 'cash') {
                    this._events.emit('order:paymentChange', { payment: value });
                }
            });
        });

        if (this._addressInput) {
            this._addressInput.addEventListener('input', () => {
                this._events.emit('order:addressChange', { address: this._addressInput.value });
            });
        }
    }

    set payment(value: TPaymentWithEmpty) {
        this._paymentButtons.forEach((button) => {
            const isActive = button.getAttribute('name') === value;
            button.classList.toggle('button_alt-active', isActive);
        });
    }

    set address(value: string) {
        if (this._addressInput) {
            this._addressInput.value = value;
        }
    }

    protected onSubmit(): void {
        this._events.emit('order:submit');
    }

    render(): HTMLElement {
        return this.container;
    }
}