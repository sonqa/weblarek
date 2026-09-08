import { IBuyer, TBuyerErrors } from '../../types';
import { EventEmitter } from '../base/Events';

export class BuyerModel {
    private _data: IBuyer = {
        payment: '',
        email: '',
        phone: '',
        address: ''
    };
    private _events: EventEmitter;

    constructor(events: EventEmitter) {
        this._events = events;
    }

    setData(data: Partial<IBuyer>): void {
        this._data = { ...this._data, ...data };
        this._events.emit('buyer:changed', this._data);
    }

    getData(): IBuyer {
        return this._data;
    }

    clear(): void {
        this._data = {
            payment: '',
            email: '',
            phone: '',
            address: ''
        };
        this._events.emit('buyer:changed', this._data);
    }

    validate(): TBuyerErrors {
        const errors: TBuyerErrors = {};

        if (!this._data.payment) {
            errors.payment = 'Выберите способ оплаты';
        }

        if (!this._data.address || this._data.address.trim() === '') {
            errors.address = 'Введите адрес доставки';
        }

        if (!this._data.email || this._data.email.trim() === '') {
            errors.email = 'Введите email';
        }

        if (!this._data.phone || this._data.phone.trim() === '') {
            errors.phone = 'Введите телефон';
        }

        return errors;
    }
}