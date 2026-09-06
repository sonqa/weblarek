import { ProductCard } from './ProductCard';

export class ProductCardCatalog extends ProductCard<{ id: string }> {
    constructor(container: HTMLElement, categoryMap: Record<string, string>) {
        super(container, categoryMap);
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    render(data: { id: string; title: string; price: number | null; category: string; image?: string }): HTMLElement {
        this.id = data.id;
        this.title = data.title;
        this.price = data.price;
        this.category = data.category;
        if (data.image) this.image = data.image;
        
        if (data.price === null) {
            this.buttonText = 'Недоступно';
            this.buttonDisabled = true;
        } else {
            this.buttonText = 'Купить';
            this.buttonDisabled = false;
        }
        
        return this.container;
    }
}