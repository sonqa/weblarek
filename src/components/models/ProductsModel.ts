import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';

export class ProductsModel {
    private _items: IProduct[] = [];
    private _selectedProduct: IProduct | null = null;
    private _events: EventEmitter;

    constructor(events: EventEmitter) {
        this._events = events;
    }

    setItems(items: IProduct[]): void {
        this._items = items;
        this._events.emit('products:changed', this._items);
    }

    getItems(): IProduct[] {
        return this._items;
    }

    getProductById(id: string): IProduct | undefined {
        return this._items.find(item => item.id === id);
    }

    setSelectedProduct(product: IProduct): void {
        this._selectedProduct = product;
        this._events.emit('product:selected', product);
    }

    getSelectedProduct(): IProduct | null {
        return this._selectedProduct;
    }
}