import './scss/styles.scss';
import { ProductsModel } from './components/models/ProductsModel';
import { CartModel } from './components/models/CartModel';
import { BuyerModel } from './components/models/BuyerModel';
import { LarekApi } from './components/services/LarekApi';
import { Api } from './components/base/Api';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';

console.log('=== НАЧАЛО ТЕСТИРОВАНИЯ ===');

const baseApi = new Api(API_URL);
const larekApi = new LarekApi(baseApi);
const productsModel = new ProductsModel();
const cartModel = new CartModel();
const buyerModel = new BuyerModel();

console.log('✅ Все модели созданы');

console.log('--- Тест 1: Модель товаров ---');
productsModel.setItems(apiProducts.items);
console.log('✅ Товаров в каталоге:', productsModel.getItems().length);
console.log('✅ Первый товар:', productsModel.getItems()[0]?.title);

if (apiProducts.items[0]) {
    const found = productsModel.getProductById(apiProducts.items[0].id);
    console.log('✅ Поиск по ID:', found?.title);
}

productsModel.setSelectedProduct(apiProducts.items[0]);
console.log('✅ Выбранный товар:', productsModel.getSelectedProduct()?.title);

console.log('--- Тест 2: Модель корзины ---');
if (apiProducts.items[0]) {
    cartModel.addItem(apiProducts.items[0]);
    console.log('✅ Добавлен товар 1. В корзине:', cartModel.getCount());
}

if (apiProducts.items[1]) {
    cartModel.addItem(apiProducts.items[1]);
    console.log('✅ Добавлен товар 2. В корзине:', cartModel.getCount());
}

console.log('✅ Общая стоимость:', cartModel.getTotalPrice());
console.log('✅ Товар 1 в корзине?', cartModel.hasProduct(apiProducts.items[0]?.id || ''));

if (apiProducts.items[0]) {
    cartModel.removeItem(apiProducts.items[0].id);
    console.log('✅ Удален товар 1. В корзине:', cartModel.getCount());
}

cartModel.clear();
console.log('✅ Корзина очищена. В корзине:', cartModel.getCount());

console.log('--- Тест 3: Модель покупателя ---');
buyerModel.setData({
    payment: 'card',
    address: 'ул. Ленина, д. 1'
});
console.log('✅ Данные (частично):', buyerModel.getData());

buyerModel.setData({
    email: 'test@example.com',
    phone: '+7-999-123-4567'
});
console.log('✅ Данные (полностью):', buyerModel.getData());

console.log('✅ Валидация (все заполнено):', buyerModel.validate());

buyerModel.clear();
console.log('✅ Валидация (все пусто):', buyerModel.validate());

console.log('--- Тест 4: Запрос к серверу ---');
larekApi.getProducts()
    .then(response => {
        console.log('✅ Ответ от сервера!');
        console.log('✅ Всего товаров:', response.total);
        productsModel.setItems(response.items);
        console.log('✅ Товары сохранены. Количество:', productsModel.getItems().length);
    })
    .catch(error => {
        console.error('❌ Ошибка:', error.message);
    });

console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');