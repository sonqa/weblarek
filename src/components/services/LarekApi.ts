import { IApi, IOrderData, IOrderResponse, IProductsResponse } from '../../types';

export class LarekApi {
    private _api: IApi;

    constructor(api: IApi) {
        this._api = api;
    }

    getProducts(): Promise<IProductsResponse> {
        return this._api.get('/product') as Promise<IProductsResponse>;
    }

    createOrder(orderData: IOrderData): Promise<IOrderResponse> {
        return this._api.post('/order', orderData) as Promise<IOrderResponse>;
    }
}