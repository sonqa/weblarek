/**
 * Базовый компонент
 */
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
<<<<<<< HEAD
       
    }

   
    protected setText(element: HTMLElement, value: string): void {
        if (element) {
            element.textContent = value;
        }
    }

    
=======
        // Учитывайте что код в конструкторе исполняется ДО всех объявлений в дочернем классе
    }

    // Инструментарий для работы с DOM в дочерних компонентах

    // Установить изображение с альтернативным текстом
>>>>>>> 7a49d87cab7d22c52f85c30ade89e07921bfa17f
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

<<<<<<< HEAD
    
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

    
=======
    // Вернуть корневой DOM-элемент
>>>>>>> 7a49d87cab7d22c52f85c30ade89e07921bfa17f
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 7a49d87cab7d22c52f85c30ade89e07921bfa17f
