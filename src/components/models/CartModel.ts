import { IProduct } from '../../types';

export class CartModel {
    private _items: IProduct[] = [];

    getItems(): IProduct[] {
        return this._items;
    }

    addItem(product: IProduct): void {
        if (!this.hasProduct(product.id)) {
            this._items.push(product);
        }
    }

    removeItem(productId: string): void {
        this._items = this._items.filter(item => item.id !== productId);
    }

    clear(): void {
        this._items = [];
    }

    getTotalPrice(): number {
        return this._items.reduce((total, item) => {
            return total + (item.price || 0);
        }, 0);
    }

    getCount(): number {
        return this._items.length;
    }

    hasProduct(productId: string): boolean {
        return this._items.some(item => item.id === productId);
    }
}