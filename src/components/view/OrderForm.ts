import { Form } from './Form';
import { EventEmitter } from '../base/Events';
import { IOrderData, TPayment, TPaymentWithEmpty } from '../../types';

export class OrderForm extends Form<IOrderData> {
    private _paymentButtons: NodeListOf<HTMLButtonElement>;
    private _addressInput: HTMLInputElement;
    private _selectedPayment: TPaymentWithEmpty = '';

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container, events);
        this._paymentButtons = container.querySelectorAll('.button_alt');
        this._addressInput = container.querySelector('input[name="address"]') as HTMLInputElement;

        this._paymentButtons.forEach((button) => {
            button.addEventListener('click', () => {
                // Используем name вместо data-payment
                const value = button.getAttribute('name') as TPayment;
                console.log('💰 Выбран способ оплаты:', value);
                if (value === 'card' || value === 'cash') {
                    this.payment = value;
                }
            });
        });

        if (this._addressInput) {
            this._addressInput.addEventListener('input', () => this.checkValidity());
        }
    }

    set payment(value: TPayment) {
        console.log('💳 Установлен способ оплаты:', value);
        this._selectedPayment = value;
        this._paymentButtons.forEach((button) => {
            // Сравниваем по name
            const isActive = button.getAttribute('name') === value;
            button.classList.toggle('button_alt-active', isActive);
        });
        this.checkValidity();
    }

    set address(value: string) {
        if (this._addressInput) {
            this._addressInput.value = value;
            this.checkValidity();
        }
    }

    private checkValidity(): void {
        const isValid = this._selectedPayment !== '' && this._addressInput?.value.trim() !== '';
        this.valid = isValid;
    }

    protected onSubmit(): void {
        console.log('📝 Форма заказа отправлена');
        if (this._selectedPayment !== '' && this._addressInput?.value.trim()) {
            this._events.emit('order:submit', {
                payment: this._selectedPayment,
                address: this._addressInput.value.trim(),
                email: '',
                phone: '',
                items: [],
                total: 0
            });
        }
    }

    render(data?: Partial<IOrderData>): HTMLElement {
        if (data?.payment) {
            this.payment = data.payment as TPayment;
        }
        if (data?.address !== undefined) {
            this.address = data.address;
        }
        return this.container;
    }
}