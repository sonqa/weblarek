import { IBuyer, TBuyerErrors } from '../../types';
<<<<<<< HEAD
import { EventEmitter } from '../base/Events';

export class BuyerModel {
    private _data: IBuyer = { 
        email: '', 
        phone: '', 
        address: '', 
        payment: '' 
    };
    private _events: EventEmitter;

    constructor(events: EventEmitter) {
        this._events = events;
    }

    setData(data: Partial<IBuyer>): void {
        this._data = { ...this._data, ...data };
        this._events.emit('buyer:changed', this._data);
=======

export class BuyerModel {
    private _data: IBuyer = {
        payment: '',
        email: '',
        phone: '',
        address: ''
    };

    setData(data: Partial<IBuyer>): void {
        this._data = { ...this._data, ...data };
>>>>>>> 7a49d87cab7d22c52f85c30ade89e07921bfa17f
    }

    getData(): IBuyer {
        return this._data;
    }

    clear(): void {
<<<<<<< HEAD
        this._data = { email: '', phone: '', address: '', payment: '' };
        this._events.emit('buyer:changed', this._data);
=======
        this._data = {
            payment: '',
            email: '',
            phone: '',
            address: ''
        };
>>>>>>> 7a49d87cab7d22c52f85c30ade89e07921bfa17f
    }

    validate(): TBuyerErrors {
        const errors: TBuyerErrors = {};
<<<<<<< HEAD
        if (!this._data.email) errors.email = 'Введите email';
        if (!this._data.phone) errors.phone = 'Введите телефон';
        if (!this._data.address) errors.address = 'Введите адрес';
        if (!this._data.payment) errors.payment = 'Выберите способ оплаты';
=======

        if (!this._data.payment) {
            errors.payment = 'Не выбран способ оплаты';
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

>>>>>>> 7a49d87cab7d22c52f85c30ade89e07921bfa17f
        return errors;
    }
}