import { IProduct } from '../../types';
<<<<<<< HEAD
import { EventEmitter } from '../base/Events';

export class CartModel {
    private _items: IProduct[] = [];
    private _events: EventEmitter;

    constructor(events: EventEmitter) {
        this._events = events;
    }
=======

export class CartModel {
    private _items: IProduct[] = [];
>>>>>>> 7a49d87cab7d22c52f85c30ade89e07921bfa17f

    getItems(): IProduct[] {
        return this._items;
    }

    addItem(product: IProduct): void {
        if (!this.hasProduct(product.id)) {
            this._items.push(product);
<<<<<<< HEAD
            this._events.emit('cart:changed', this._items);
=======
>>>>>>> 7a49d87cab7d22c52f85c30ade89e07921bfa17f
        }
    }

    removeItem(productId: string): void {
        this._items = this._items.filter(item => item.id !== productId);
<<<<<<< HEAD
        this._events.emit('cart:changed', this._items);
=======
>>>>>>> 7a49d87cab7d22c52f85c30ade89e07921bfa17f
    }

    clear(): void {
        this._items = [];
<<<<<<< HEAD
        this._events.emit('cart:changed', this._items);
    }

    getTotalPrice(): number {
        return this._items.reduce((sum, item) => sum + (item.price || 0), 0);
=======
    }

    getTotalPrice(): number {
        return this._items.reduce((total, item) => {
            return total + (item.price || 0);
        }, 0);
>>>>>>> 7a49d87cab7d22c52f85c30ade89e07921bfa17f
    }

    getCount(): number {
        return this._items.length;
    }

    hasProduct(productId: string): boolean {
        return this._items.some(item => item.id === productId);
    }
}