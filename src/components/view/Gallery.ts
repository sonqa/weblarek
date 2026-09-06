import { Component } from '../base/Component';

export class Gallery extends Component<{ cards: HTMLElement[] }> {
    private _container: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this._container = container;
    }

    set cards(value: HTMLElement[]) {
        this._container.replaceChildren(...value);
    }

    render(data: { cards: HTMLElement[] }): HTMLElement {
        this.cards = data.cards;
        return this.container;
    }
}