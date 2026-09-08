import { ProductCard } from './ProductCard';

export class ProductCardCatalog extends ProductCard<{ id: string }> {
    private _category: HTMLElement;
    private _image?: HTMLImageElement;
    private _categoryMap: Record<string, string>;

    constructor(container: HTMLElement, categoryMap: Record<string, string>) {
        super(container);
        this._categoryMap = categoryMap;
        this._category = container.querySelector('.card__category') as HTMLElement;
        this._image = container.querySelector('.card__image') as HTMLImageElement || undefined;
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    set category(value: string) {
        if (this._category) {
            this.setText(this._category, value);
            const categoryClass = this._categoryMap[value] || 'card__category_other';
            this._category.className = categoryClass;
        }
    }

    set image(value: string) {
        if (this._image) {
            this.setImage(this._image, value, this._title?.textContent || '');
        }
    }

    set onClick(callback: () => void) {
        this.container.addEventListener('click', callback);
    }

    render(data: { id: string; title: string; price: number | null; category: string; image?: string }): HTMLElement {
        this.id = data.id;
        this.title = data.title;
        this.price = data.price;
        this.category = data.category;
        if (data.image) this.image = data.image;
        return this.container;
    }
}