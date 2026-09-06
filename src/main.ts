import './scss/styles.scss';
import { EventEmitter } from './components/base/Events';
import { ProductsModel } from './components/models/ProductsModel';
import { CartModel } from './components/models/CartModel';
import { BuyerModel } from './components/models/BuyerModel';
import { LarekApi } from './components/services/LarekApi';
import { Api } from './components/base/Api';
import {
    Gallery,
    Modal,
    Header,
    Cart,
    ProductCardCatalog,
    ProductCardPreview,
    ProductCardCart,
    OrderForm,
    ContactsForm,
    OrderSuccess
} from './components/view';
import { categoryMap, API_URL, CDN_URL } from './utils/constants';
import { IProduct, IOrderData, IBuyer, TPayment, TPaymentWithEmpty } from './types';

const events = new EventEmitter();
const api = new LarekApi(new Api(API_URL));
const productsModel = new ProductsModel(events);
const cartModel = new CartModel(events);
const buyerModel = new BuyerModel(events);

const galleryContainer = document.querySelector('.gallery') as HTMLElement;
const modalContainer = document.querySelector('#modal-container') as HTMLElement;
const headerContainer = document.querySelector('.header') as HTMLElement;

if (!headerContainer) {
    console.error('❌ .header не найден!');
}
if (!galleryContainer) {
    console.error('❌ .gallery не найден!');
}
if (!modalContainer) {
    console.error('❌ #modal-container не найден!');
}

const gallery = new Gallery(galleryContainer);
const modal = new Modal(modalContainer, events);
const header = new Header(headerContainer, events);

let currentCartContent: HTMLElement | null = null;

api.getProducts()
    .then(data => {
        console.log('✅ Товары загружены:', data.items.length);
        productsModel.setItems(data.items);
    })
    .catch(err => console.error('❌ Ошибка загрузки товаров:', err));


// 1. Обновление каталога
events.on('products:changed', () => {
    const items = productsModel.getItems();
    const cards = items.map(item => {
        const template = document.querySelector('#card-catalog') as HTMLTemplateElement;
        const cardElement = template?.content?.querySelector('.card')?.cloneNode(true) as HTMLElement;
        const card = new ProductCardCatalog(
            cardElement || document.createElement('div'),
            categoryMap
        );

        card.onClick = () => {
            productsModel.setSelectedProduct(item);
        };

        card.onButtonClick = () => {
            cartModel.addItem(item);
        };

        return card.render({
            id: item.id,
            title: item.title,
            price: item.price ?? null,
            category: item.category,
            image: CDN_URL + item.image
        });
    });

    gallery.render({ cards });
});

// 2. Выбор товара
events.on('product:selected', (product: IProduct) => {
    const template = document.querySelector('#card-preview') as HTMLTemplateElement;
    const cardElement = template?.content?.querySelector('.card')?.cloneNode(true) as HTMLElement;
    const card = new ProductCardPreview(
        cardElement || document.createElement('div'),
        categoryMap
    );

    const inCart = cartModel.hasProduct(product.id);

    card.onButtonClick = () => {
        if (inCart) {
            cartModel.removeItem(product.id);
            modal.close();
        } else {
            cartModel.addItem(product);
            modal.close();
        }
    };

    modal.render({
        content: card.render({
            id: product.id,
            title: product.title,
            price: product.price ?? null,
            category: product.category,
            image: CDN_URL + product.image,
            description: product.description || '',
            inCart
        })
    });
});

// 3. Обновление корзины
events.on('cart:changed', () => {
    const items = cartModel.getItems();
    header.render({ cartCount: items.length });
    
    
    if (currentCartContent) {
        console.log('🔄 Обновляем корзину');
        renderCartContent();
    }
});


function renderCartContent(): void {
    const items = cartModel.getItems();
    const isEmpty = items.length === 0;

    const template = document.querySelector('#basket') as HTMLTemplateElement;
    const cartElement = template?.content?.querySelector('.basket')?.cloneNode(true) as HTMLElement;
    const cart = new Cart(
        cartElement || document.createElement('div'),
        events
    );

    const cardElements = items.map((item, index) => {
        const template = document.querySelector('#card-basket') as HTMLTemplateElement;
        const cardElement = template?.content?.querySelector('.basket__item')?.cloneNode(true) as HTMLElement;
        const card = new ProductCardCart(
            cardElement || document.createElement('div')
        );

        if (card.setIndex) {
            card.setIndex = index + 1;
        }
        card.onDelete = () => {
            console.log('🗑️ Удаляем товар:', item.id);
            cartModel.removeItem(item.id);
        };

        return card.render({
            id: item.id,
            title: item.title,
            price: item.price || 0
        });
    });

    const renderedCart = cart.render({
        items: cardElements,
        totalPrice: cartModel.getTotalPrice(),
        isEmpty
    });

    // Обновляем содержимое модалки
    currentCartContent = renderedCart;
    modal.render({ content: renderedCart });
}

// 4. Открытие корзины
events.on('cart:open', () => {
    console.log('🛒 Открываем корзину');
    renderCartContent();
});

// 5. Оформление заказа
events.on('cart:checkout', () => {
    console.log('📦 Событие cart:checkout сработало!');
    currentCartContent = null; // Сбрасываем текущую корзину
    modal.close();

    const template = document.querySelector('#order') as HTMLTemplateElement;
    const orderElement = template?.content?.querySelector('.form')?.cloneNode(true) as HTMLElement;
    const orderForm = new OrderForm(
        orderElement || document.createElement('form'),
        events
    );

    const buyerData = buyerModel.getData();
    modal.render({
        content: orderForm.render({
            payment: buyerData.payment || undefined,
            address: buyerData.address || ''
        })
    });
});

// 6. Переход ко второму шагу
events.on('order:submit', (data: { payment: TPaymentWithEmpty; address: string }) => {
    console.log('📦 Получены данные заказа:', data);
    buyerModel.setData({
        payment: data.payment,
        address: data.address
    });

    const template = document.querySelector('#contacts') as HTMLTemplateElement;
    const contactsElement = template?.content?.querySelector('.form')?.cloneNode(true) as HTMLElement;
    const contactsForm = new ContactsForm(
        contactsElement || document.createElement('form'),
        events
    );

    const buyerData = buyerModel.getData();
    modal.render({
        content: contactsForm.render({
            email: buyerData.email || '',
            phone: buyerData.phone || ''
        })
    });
});

// 7. Отправка заказа
events.on('contacts:submit', (data: IBuyer) => {
    console.log('📦 Отправка заказа:', data);
    buyerModel.setData({
        email: data.email,
        phone: data.phone
    });

    const buyerData = buyerModel.getData();
    const items = cartModel.getItems();

    const orderData: IOrderData = {
        payment: (buyerData.payment || 'card') as TPayment,
        address: buyerData.address,
        email: buyerData.email,
        phone: buyerData.phone,
        items: items.map(item => item.id),
        total: cartModel.getTotalPrice()
    };

    api.createOrder(orderData)
        .then(response => {
            console.log('✅ Заказ оформлен:', response);
            currentCartContent = null; 
            
            const template = document.querySelector('#success') as HTMLTemplateElement;
            const successElement = template?.content?.querySelector('.order-success')?.cloneNode(true) as HTMLElement;
            const successView = new OrderSuccess(
                successElement || document.createElement('div'),
                events
            );
            modal.render({
                content: successView.render({ total: orderData.total })
            });

            setTimeout(() => {
                const closeButton = document.querySelector('.order-success__close');
                if (closeButton) {
                    console.log('✅ Нашли кнопку через main.ts');
                    closeButton.addEventListener('click', () => {
                        console.log('🔄 Закрытие через main.ts');
                        modal.close();
                    });
                } else {
                    console.warn('⚠️ Кнопка .order-success__close не найдена в DOM');
                }
            }, 100);

            cartModel.clear();
            buyerModel.clear();
        })
        .catch(err => console.error('❌ Ошибка оформления заказа:', err));
});

// 8. Изменение форм
events.on('form:change', ({ field, value }: { field: string; value: string }) => {
    buyerModel.setData({ [field]: value });
});

// 9. Закрытие модалки
events.on('modal:close', () => {
    console.log('🔚 Модалка закрыта');
    currentCartContent = null; 
});