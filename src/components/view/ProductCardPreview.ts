import { ProductCard } from './ProductCard';

export class ProductCardPreview extends ProductCard<{ id: string }> {
    private _description: HTMLElement;

    constructor(container: HTMLElement, categoryMap: Record<string, string>) {
        super(container, categoryMap);
        this._description = container.querySelector('.card__description') as HTMLElement;
    }


    set description(value: string) {
        if (this._description) {
            this.setText(this._description, value);
        }
    }

    render(data: { 
        id: string; 
        title: string; 
        price: number | null; 
        category: string; 
        image: string; 
        description: string;
        inCart?: boolean;
    }): HTMLElement {
        this.title = data.title;
        this.price = data.price;
        this.category = data.category;
        this.image = data.image;
        this.description = data.description;

        if (data.price === null) {
            this.buttonText = 'Недоступно';
            this.buttonDisabled = true;
        } else if (data.inCart) {
            this.buttonText = 'Удалить из корзины';
            this.buttonDisabled = false;
        } else {
            this.buttonText = 'Купить';
            this.buttonDisabled = false;
        }

        return this.container;
    }
}