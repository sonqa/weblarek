import { IProduct } from '../../types';
import { EventEmitter } from '../base/Events';

export class CartModel {
    private _items: IProduct[] = [];
    private _events: EventEmitter;

    constructor(events: EventEmitter) {
        this._events = events;
    }

    getItems(): IProduct[] {
        return this._items;
    }

    addItem(product: IProduct): void {
        if (!this.hasProduct(product.id)) {
            this._items.push(product);
            this._events.emit('cart:changed', this._items);
        }
    }

    removeItem(productId: string): void {
        this._items = this._items.filter(item => item.id !== productId);
        this._events.emit('cart:changed', this._items);
    }

    clear(): void {
        this._items = [];
        this._events.emit('cart:changed', this._items);
    }

    getTotalPrice(): number {
        return this._items.reduce((sum, item) => sum + (item.price || 0), 0);
    }

    getCount(): number {
        return this._items.length;
    }

    hasProduct(productId: string): boolean {
        return this._items.some(item => item.id === productId);
    }
}