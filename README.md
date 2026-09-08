# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.
## Модели данных

### Класс ProductsModel
Хранение и управление каталогом товаров.

Поля:
- `_items: IProduct[]` - массив всех товаров
- `_selectedProduct: IProduct | null` - выбранный товар

Методы:
- `setItems(items: IProduct[]): void`
- `getItems(): IProduct[]`
- `getProductById(id: string): IProduct | undefined`
- `setSelectedProduct(product: IProduct): void`
- `getSelectedProduct(): IProduct | null`

### Класс CartModel
Управление корзиной покупателя.

Поля:
- `_items: IProduct[]` - товары в корзине

Методы:
- `getItems(): IProduct[]`
- `addItem(product: IProduct): void`
- `removeItem(productId: string): void`
- `clear(): void`
- `getTotalPrice(): number`
- `getCount(): number`
- `hasProduct(productId: string): boolean`

### Класс BuyerModel
Хранение и валидация данных покупателя.

Поля:
- `_data: IBuyer` - данные покупателя

Методы:
- `setData(data: Partial<IBuyer>): void`
- `getData(): IBuyer`
- `clear(): void`
- `validate(): TBuyerErrors`

## Слой коммуникации

### Класс LarekApi
Взаимодействие с сервером.

Конструктор: принимает `IApi`

Поля:
- `_api: IApi` - объект для HTTP-запросов

Методы:
- `getProducts(): Promise<IProductsResponse>`
- `createOrder(orderData: IOrderData): Promise<IOrderResponse>`

## Типы данных

- `IProduct` - товар
- `IBuyer` - покупатель
- `TPayment` - способы оплаты ('card' | 'cash')
- `TBuyerErrors` - ошибки валидации
- `IOrderData` - данные заказа
- `IOrderResponse` - ответ сервера
- `IProductsResponse` - ответ сервера с товарами

## Архитектура

Используется паттерн MVP с инверсией зависимостей:
- `LarekApi` зависит от `IApi`, а не от конкретного `Api`

## Слой представления (View)

### Базовый класс ProductCard<T>
Абстрактный базовый класс для карточек товаров.

**Назначение:** содержит общую логику для отображения карточки товара в разных частях приложения.

**Конструктор:** 
- `constructor(container: HTMLElement, categoryMap: Record<string, string>)`

**Поля:**
- `_title: HTMLElement` - элемент заголовка
- `_price: HTMLElement` - элемент цены
- `_category: HTMLElement` - элемент категории
- `_image?: HTMLImageElement` - элемент изображения
- `_button?: HTMLButtonElement` - элемент кнопки
- `_categoryMap: Record<string, string>` - маппинг категорий для стилей

**Методы:**
- `set title(value: string)` - устанавливает заголовок
- `set price(value: number | null)` - устанавливает цену
- `set category(value: string)` - устанавливает категорию
- `set image(value: string)` - устанавливает изображение
- `set buttonText(value: string)` - устанавливает текст кнопки
- `set buttonDisabled(value: boolean)` - блокирует кнопку
- `set onClick(callback: () => void)` - обработчик клика на карточку
- `set onButtonClick(callback: () => void)` - обработчик клика на кнопку

---

### Класс ProductCardCatalog
Карточка для каталога.

**Наследуется от:** `ProductCard<T>`

**Генерируемые события:**
- `card:select` - клик по карточке (передает `{ id: string }`)
- `cart:add` - клик по кнопке "Купить" (передает `{ id: string }`)

---

### Класс ProductCardPreview
Карточка для просмотра в модалке.

**Наследуется от:** `ProductCard<T>`

**Генерируемые события:**
- `cart:add` - клик по "Купить" (передает `{ id: string }`)
- `cart:remove` - клик по "Удалить из корзины" (передает `{ id: string }`)

---

### Класс ProductCardCart
Карточка для корзины.

**Наследуется от:** `ProductCard<T>`

**Генерируемые события:**
- `cart:remove` - клик по удалению (передает `{ id: string }`)

---

### Класс Modal
Управление модальным окном.

**Конструктор:**
- `constructor(container: HTMLElement, events: EventEmitter)`

**Поля:**
- `_container: HTMLElement` - корневой элемент
- `_content: HTMLElement` - контейнер для контента
- `_closeButton: HTMLElement` - кнопка закрытия
- `_events: EventEmitter` - брокер событий

**Методы:**
- `set content(value: HTMLElement)` - устанавливает содержимое
- `open(): void` - открывает модалку
- `close(): void` - закрывает модалку

**Генерируемые события:**
- `modal:open` - при открытии
- `modal:close` - при закрытии

---

### Базовый класс Form<T>
Абстрактный базовый класс для форм.

**Конструктор:**
- `constructor(container: HTMLElement, events: EventEmitter)`

**Поля:**
- `_events: EventEmitter` - брокер событий
- `_submitButton: HTMLButtonElement` - кнопка отправки
- `_error: HTMLElement` - элемент для ошибок

**Методы:**
- `set valid(value: boolean)` - активирует кнопку
- `set errors(value: string)` - показывает ошибку
- `protected onInputChange(field: keyof T, value: string): void`

**Генерируемые события:**
- `form:change` - при изменении поля (передает `{ field: string, value: string }`)

---

### Класс OrderForm
Форма оформления (первый шаг).

**Наследуется от:** `Form<IOrderData>`

**Поля:**
- `_paymentButtons: NodeListOf<HTMLButtonElement>` - кнопки оплаты
- `_addressInput: HTMLInputElement` - поле адреса

**Методы:**
- `set payment(value: TPayment)` - выбирает способ оплаты
- `set address(value: string)` - устанавливает адрес

**Генерируемые события:**
- `order:submit` - клик по "Далее" (передает `IOrderData`)

---

### Класс ContactsForm
Форма контактов (второй шаг).

**Наследуется от:** `Form<IBuyer>`

**Поля:**
- `_emailInput: HTMLInputElement` - поле email
- `_phoneInput: HTMLInputElement` - поле телефона

**Методы:**
- `set email(value: string)` - устанавливает email
- `set phone(value: string)` - устанавливает телефон

**Генерируемые события:**
- `contacts:submit` - клик по "Оплатить" (передает `IBuyer`)

---

### Класс Cart
Отображение корзины.

**Конструктор:**
- `constructor(container: HTMLElement, events: EventEmitter)`

**Поля:**
- `_items: HTMLElement` - контейнер для товаров
- `_totalPrice: HTMLElement` - общая стоимость
- `_checkoutButton: HTMLButtonElement` - кнопка оформления
- `_emptyMessage: HTMLElement` - сообщение о пустоте

**Методы:**
- `set items(value: HTMLElement[])` - устанавливает товары
- `set totalPrice(value: number)` - устанавливает цену
- `set canCheckout(value: boolean)` - активирует кнопку
- `set isEmpty(value: boolean)` - показывает сообщение

**Генерируемые события:**
- `cart:checkout` - клик по "Оформить"

---

### Класс Gallery
Каталог товаров.

**Конструктор:**
- `constructor(container: HTMLElement)`

**Поля:**
- `_container: HTMLElement` - контейнер для карточек

**Методы:**
- `set cards(value: HTMLElement[])` - устанавливает карточки

---

### Класс Header
Шапка сайта.

**Конструктор:**
- `constructor(container: HTMLElement, events: EventEmitter)`

**Поля:**
- `_cartCounter: HTMLElement` - счетчик корзины
- `_cartButton: HTMLElement` - кнопка корзины

**Методы:**
- `set cartCount(value: number)` - обновляет счетчик

**Генерируемые события:**
- `cart:open` - клик по корзине

---

### Класс OrderSuccess
Успешный заказ.

**Конструктор:**
- `constructor(container: HTMLElement)`

**Поля:**
- `_message: HTMLElement` - элемент с сообщением

**Методы:**
- `set total(value: number)` - устанавливает сумму

---

## Презентер (Presenter)

**Реализация:** в файле `src/main.ts`

**Обработчики событий от моделей:**
- `products:changed` → обновление каталога
- `cart:changed` → обновление корзины и счетчика
- `product:selected` → открытие модалки с товаром
- `buyer:changed` → обновление валидации форм

**Обработчики событий от представлений:**
- `card:select` → выбор товара
- `cart:add` → добавление в корзину
- `cart:remove` → удаление из корзины
- `cart:open` → открытие корзины
- `cart:checkout` → оформление заказа
- `order:submit` → переход на второй шаг
- `contacts:submit` → отправка заказа
- `form:change` → изменение данных в формах
- `modal:close` → закрытие модалки

---

### События в приложении:

**От моделей:**
- `products:changed`
- `product:selected`
- `cart:changed`
- `buyer:changed`

**От представлений:**
- `card:select`
- `cart:add`
- `cart:remove`
- `cart:open`
- `cart:checkout`
- `order:submit`
- `contacts:submit`
- `form:change`
- `modal:open`
- `modal:close`
