import { ProductCard } from './ProductCard';

export class ProductCardPreview extends ProductCard<{ 
    title: string; 
    price: number | null; 
    category: string; 
    image: string; 
    description: string; 
    buttonText: string; 
    buttonDisabled: boolean;
}> {
    private _category: HTMLElement;
    private _image: HTMLImageElement;
    private _description: HTMLElement;
    private _button: HTMLButtonElement;
    private _categoryMap: Record<string, string>;

    constructor(container: HTMLElement, categoryMap: Record<string, string>) {
        super(container);
        this._categoryMap = categoryMap;
        this._category = container.querySelector('.card__category') as HTMLElement;
        this._image = container.querySelector('.card__image') as HTMLImageElement;
        this._description = container.querySelector('.card__text') as HTMLElement;
        this._button = container.querySelector('.card__button') as HTMLButtonElement;
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

    set description(value: string) {
        if (this._description) {
            this.setText(this._description, value);
        }
    }

    set buttonText(value: string) {
        if (this._button) this.setText(this._button, value);
    }

    set buttonDisabled(value: boolean) {
        if (this._button) this._button.disabled = value;
    }

    set onButtonClick(callback: () => void) {
        if (this._button) {
            this._button.addEventListener('click', (e) => {
                e.stopPropagation();
                callback();
            });
        }
    }

    render(data: { 
        title: string; 
        price: number | null; 
        category: string; 
        image: string; 
        description: string; 
        buttonText: string; 
        buttonDisabled: boolean;
    }): HTMLElement {
        this.title = data.title;
        this.price = data.price;
        this.category = data.category;
        this.image = data.image;
        this.description = data.description;
        this.buttonText = data.buttonText;
        this.buttonDisabled = data.buttonDisabled;
        return this.container;
    }
}