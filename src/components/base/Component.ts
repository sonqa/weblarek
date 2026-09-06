/**
 * Базовый компонент
 */
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
       
    }

   
    protected setText(element: HTMLElement, value: string): void {
        if (element) {
            element.textContent = value;
        }
    }

    
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    
    protected toggleClass(element: HTMLElement, className: string, force?: boolean) {
        if (element) {
            element.classList.toggle(className, force);
        }
    }

   
    protected setDisabled(element: HTMLButtonElement, value: boolean) {
        if (element) {
            element.disabled = value;
        }
    }

    
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}