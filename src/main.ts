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

// Инициализация
const events = new EventEmitter();
const api = new LarekApi(new Api(API_URL));
const productsModel = new ProductsModel(events);
const cartModel = new CartModel(events);
const buyerModel = new BuyerModel(events);

// DOM элементы
const galleryContainer = document.querySelector('.gallery') as HTMLElement;
const modalContainer = document.querySelector('#modal-container') as HTMLElement;
const headerContainer = document.querySelector('.header') as HTMLElement;

// Компоненты View (создаём один раз)
const gallery = new Gallery(galleryContainer);
const modal = new Modal(modalContainer, events);
const header = new Header(headerContainer, events);

// Создаём компоненты один раз
const cartTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cartElement = cartTemplate?.content?.querySelector('.basket')?.cloneNode(true) as HTMLElement;
const cart = new Cart(cartElement || document.createElement('div'), events);

const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const orderElement = orderTemplate?.content?.querySelector('.form')?.cloneNode(true) as HTMLElement;
const orderForm = new OrderForm(orderElement || document.createElement('form'), events);

const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const contactsElement = contactsTemplate?.content?.querySelector('.form')?.cloneNode(true) as HTMLElement;
const contactsForm = new ContactsForm(contactsElement || document.createElement('form'), events);

// Загрузка товаров
api.getProducts()
    .then(data => {
        productsModel.setItems(data.items);
    })
    .catch(err => console.error('Ошибка загрузки товаров:', err));

// ----- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ -----

function renderCatalog(): void {
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

        return card.render({
            id: item.id,
            title: item.title,
            price: item.price ?? null,
            category: item.category,
            image: CDN_URL + item.image
        });
    });

    gallery.render({ cards });
}

function renderCart(): void {
    const items = cartModel.getItems();
    const isEmpty = items.length === 0;

    const cardElements = items.map((item, index) => {
        const template = document.querySelector('#card-basket') as HTMLTemplateElement;
        const cardElement = template?.content?.querySelector('.basket__item')?.cloneNode(true) as HTMLElement;
        const card = new ProductCardCart(cardElement || document.createElement('div'));

        card.onDelete = () => {
            cartModel.removeItem(item.id);
        };

        return card.render({
            title: item.title,
            price: item.price || 0,
            index: index + 1
        });
    });

    cart.items = cardElements;
    cart.totalPrice = cartModel.getTotalPrice();
    cart.isEmpty = isEmpty;
    cart.canCheckout = !isEmpty;
}

function renderOrderForm(): void {
    const data = buyerModel.getData();
    orderForm.payment = data.payment;
    orderForm.address = data.address;
    updateOrderFormValidity();
}

function renderContactsForm(): void {
    const data = buyerModel.getData();
    contactsForm.email = data.email;
    contactsForm.phone = data.phone;
    updateContactsFormValidity();
}

function updateOrderFormValidity(): void {
    const errors = buyerModel.validate();
    orderForm.errors = errors.payment || errors.address || '';
    const isValid = !errors.payment && !errors.address;
    orderForm.valid = isValid;
}

function updateContactsFormValidity(): void {
    const errors = buyerModel.validate();
    contactsForm.errors = errors.email || errors.phone || '';
    const isValid = !errors.email && !errors.phone;
    contactsForm.valid = isValid;
}

function updateBuyerUI(): void {
    renderOrderForm();
    renderContactsForm();
}

// ----- ОБРАБОТЧИКИ СОБЫТИЙ -----

// Модели
events.on('products:changed', renderCatalog);

events.on('product:selected', (product: IProduct) => {
    const template = document.querySelector('#card-preview') as HTMLTemplateElement;
    const cardElement = template?.content?.querySelector('.card')?.cloneNode(true) as HTMLElement;
    const card = new ProductCardPreview(cardElement || document.createElement('div'), categoryMap);

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

    const buttonText = product.price === null ? 'Недоступно' : (inCart ? 'Удалить из корзины' : 'Купить');
    const buttonDisabled = product.price === null;

    modal.render({
        content: card.render({
            title: product.title,
            price: product.price ?? null,
            category: product.category,
            image: CDN_URL + product.image,
            description: product.description || '',
            buttonText,
            buttonDisabled
        })
    });
});

events.on('cart:changed', () => {
    const items = cartModel.getItems();
    header.render({ cartCount: items.length });
    renderCart();
});

events.on('buyer:changed', updateBuyerUI);

// Представления
events.on('cart:open', () => {
    modal.render({ content: cart.render() });
});

events.on('cart:checkout', () => {
    modal.close();
    renderOrderForm();
    modal.render({ content: orderForm.render() });
});

events.on('order:paymentChange', ({ payment }: { payment: TPayment }) => {
    buyerModel.setData({ payment });
});

events.on('order:addressChange', ({ address }: { address: string }) => {
    buyerModel.setData({ address });
});

events.on('order:submit', () => {
    const errors = buyerModel.validate();
    if (!errors.payment && !errors.address) {
        renderContactsForm();
        modal.render({ content: contactsForm.render() });
    } else {
        updateOrderFormValidity();
    }
});

events.on('contacts:emailChange', ({ email }: { email: string }) => {
    buyerModel.setData({ email });
});

events.on('contacts:phoneChange', ({ phone }: { phone: string }) => {
    buyerModel.setData({ phone });
});

events.on('contacts:submit', () => {
    const errors = buyerModel.validate();
    if (!errors.email && !errors.phone) {
        const buyerData = buyerModel.getData();
        const items = cartModel.getItems();

        const orderData: IOrderData = {
            payment: buyerData.payment as TPayment,
            address: buyerData.address,
            email: buyerData.email,
            phone: buyerData.phone,
            items: items.map(item => item.id),
            total: cartModel.getTotalPrice()
        };

        api.createOrder(orderData)
            .then(response => {
                const template = document.querySelector('#success') as HTMLTemplateElement;
                const successElement = template?.content?.querySelector('.order-success')?.cloneNode(true) as HTMLElement;
                const successView = new OrderSuccess(successElement || document.createElement('div'), events);

                modal.render({
                    content: successView.render({ total: response.total })
                });

                cartModel.clear();
                buyerModel.clear();
            })
            .catch(err => console.error('Ошибка оформления заказа:', err));
    } else {
        updateContactsFormValidity();
    }
});

events.on('success:close', () => {
    modal.close();
});

events.on('modal:close', () => {
    // Очищаем состояния при закрытии
});