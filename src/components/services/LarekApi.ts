import { Api } from '../base/api';
import { IOrderData, IOrderResponse, IProductsResponse } from '../../types';

export class LarekApi {
    private _api: Api;

    constructor(api: Api) {
        this._api = api;
    }

    getProducts(): Promise<IProductsResponse> {
        return this._api.get('/product') as Promise<IProductsResponse>;
    }

    createOrder(orderData: IOrderData): Promise<IOrderResponse> {
        return this._api.post('/order', orderData) as Promise<IOrderResponse>;
    }
}