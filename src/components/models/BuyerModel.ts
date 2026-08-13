import { IBuyer } from '../../types';

export class BuyerModel {
    private _data: Partial<IBuyer> = {};

    setData(data: Partial<IBuyer>): void {
        this._data = { ...this._data, ...data };
    }

    getData(): IBuyer {
        return this._data as IBuyer;
    }

    clear(): void {
        this._data = {};
    }

    validate(): Partial<Record<keyof IBuyer, string>> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};

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

        return errors;
    }
}