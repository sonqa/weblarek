import { Component } from '../base/Component';
import { EventEmitter } from '../base/Events';

export class Modal extends Component<{ content: HTMLElement }> {
    private _content: HTMLElement;
    private _closeButton: HTMLElement;
    private _events: EventEmitter;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(container);
        this._events = events;
        this._content = container.querySelector('.modal__content') as HTMLElement;
        this._closeButton = container.querySelector('.modal__close') as HTMLElement;

        this._closeButton.addEventListener('click', () => this.close());
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.close();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
        this._events.emit('modal:open');
    }

    close(): void {
        this.container.classList.remove('modal_active');
        this._content.replaceChildren();
        this._events.emit('modal:close');
    }

    render(data: { content: HTMLElement }): HTMLElement {
        this.content = data.content;
        this.open();
        return this.container;
    }
}