import { IProduct } from '../../types';
<<<<<<< HEAD
import { EventEmitter } from '../base/Events';
=======
>>>>>>> 7a49d87cab7d22c52f85c30ade89e07921bfa17f

export class ProductsModel {
    private _items: IProduct[] = [];
    private _selectedProduct: IProduct | null = null;
<<<<<<< HEAD
    private _events: EventEmitter;

    constructor(events: EventEmitter) {
        this._events = events;
    }

    setItems(items: IProduct[]): void {
        this._items = items;
        this._events.emit('products:changed', this._items);
=======

    setItems(items: IProduct[]): void {
        this._items = items;
>>>>>>> 7a49d87cab7d22c52f85c30ade89e07921bfa17f
    }

    getItems(): IProduct[] {
        return this._items;
    }

    getProductById(id: string): IProduct | undefined {
        return this._items.find(item => item.id === id);
    }

    setSelectedProduct(product: IProduct): void {
        this._selectedProduct = product;
<<<<<<< HEAD
        this._events.emit('product:selected', product);
=======
>>>>>>> 7a49d87cab7d22c52f85c30ade89e07921bfa17f
    }

    getSelectedProduct(): IProduct | null {
        return this._selectedProduct;
    }
}