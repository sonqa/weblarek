import { IBuyer, TBuyerErrors } from '../../types';
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
    }

    getData(): IBuyer {
        return this._data;
    }

    clear(): void {
        this._data = { email: '', phone: '', address: '', payment: '' };
        this._events.emit('buyer:changed', this._data);
    }

    validate(): TBuyerErrors {
        const errors: TBuyerErrors = {};
        if (!this._data.email) errors.email = 'Введите email';
        if (!this._data.phone) errors.phone = 'Введите телефон';
        if (!this._data.address) errors.address = 'Введите адрес';
        if (!this._data.payment) errors.payment = 'Выберите способ оплаты';
        return errors;
    }
}