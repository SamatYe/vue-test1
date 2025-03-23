import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import SkeletonLoader from './components/SkeletonLoader.vue';
const items = ref([]);
const cart = ref([]);
const isCartOpen = ref(false);
const selectedItem = ref(null);
const loading = ref(true); // <-- добавили loading
onMounted(async () => {
    try {
        const response = await axios.get('https://35c7fb3b6b9ec247.mokky.dev/items');
        items.value = response.data;
    }
    catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
    }
    finally {
        loading.value = false; // <-- после загрузки убираем loading
    }
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart.value = JSON.parse(savedCart);
    }
});
watch(cart, (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
}, { deep: true });
function toggleCart() {
    isCartOpen.value = !isCartOpen.value;
}
function addToCart(item) {
    if (!cart.value.some((i) => i.id === item.id)) {
        cart.value.push(item);
    }
}
function removeFromCart(id) {
    cart.value = cart.value.filter(item => item.id !== id);
}
function openItemDetails(item) {
    selectedItem.value = item;
}
function closeItemDetails() {
    selectedItem.value = null;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "app" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "app__header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "app__title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.toggleCart) },
    ...{ class: "app__cart-btn" },
});
(__VLS_ctx.cart.length);
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "app__main" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "products" },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.items))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.openItemDetails(item);
            } },
        key: (item.id),
        ...{ class: "product-card" },
    });
    if (!__VLS_ctx.loading) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (item.imageUrl),
            alt: (item.title),
            ...{ class: "product-card__img" },
        });
    }
    else {
        /** @type {[typeof SkeletonLoader, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(SkeletonLoader, new SkeletonLoader({
            width: "150px",
            height: "150px",
            borderRadius: "8px",
        }));
        const __VLS_1 = __VLS_0({
            width: "150px",
            height: "150px",
            borderRadius: "8px",
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "product-card__title" },
    });
    if (__VLS_ctx.loading) {
        /** @type {[typeof SkeletonLoader, ]} */ ;
        // @ts-ignore
        const __VLS_3 = __VLS_asFunctionalComponent(SkeletonLoader, new SkeletonLoader({
            width: "80%",
            height: "20px",
        }));
        const __VLS_4 = __VLS_3({
            width: "80%",
            height: "20px",
        }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (item.title);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "product-card__price" },
    });
    if (__VLS_ctx.loading) {
        /** @type {[typeof SkeletonLoader, ]} */ ;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(SkeletonLoader, new SkeletonLoader({
            width: "60%",
            height: "20px",
        }));
        const __VLS_7 = __VLS_6({
            width: "60%",
            height: "20px",
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (item.price);
    }
    if (!__VLS_ctx.loading) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(!__VLS_ctx.loading))
                        return;
                    __VLS_ctx.addToCart(item);
                } },
            ...{ class: "product-card__btn" },
        });
    }
    else {
        /** @type {[typeof SkeletonLoader, ]} */ ;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(SkeletonLoader, new SkeletonLoader({
            width: "100%",
            height: "36px",
            borderRadius: "4px",
        }));
        const __VLS_10 = __VLS_9({
            width: "100%",
            height: "36px",
            borderRadius: "4px",
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)({
    ...{ class: "cart" },
    ...{ class: ({ 'cart--open': __VLS_ctx.isCartOpen }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "cart__title" },
});
if (__VLS_ctx.cart.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cart__empty" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "cart__items" },
    });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.cart))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.cart.length === 0))
                        return;
                    __VLS_ctx.openItemDetails(item);
                } },
            key: (item.id),
            ...{ class: "cart-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (item.imageUrl),
            ...{ class: "cart-item__img" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "cart-item__details" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: "cart-item__title" },
        });
        (item.title);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "cart-item__price" },
        });
        (item.price);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.cart.length === 0))
                        return;
                    __VLS_ctx.removeFromCart(item.id);
                } },
            ...{ class: "cart-item__remove" },
        });
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.toggleCart) },
    ...{ class: "cart__close" },
});
if (__VLS_ctx.selectedItem) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (__VLS_ctx.closeItemDetails) },
        ...{ class: "overlay" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: () => { } },
        ...{ class: "details" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.selectedItem.imageUrl),
        ...{ class: "details__img" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "details__title" },
    });
    (__VLS_ctx.selectedItem.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "details__price" },
    });
    (__VLS_ctx.selectedItem.price);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.selectedItem))
                    return;
                __VLS_ctx.removeFromCart(__VLS_ctx.selectedItem.id);
            } },
        ...{ class: "details__remove" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.closeItemDetails) },
        ...{ class: "details__close" },
    });
}
/** @type {__VLS_StyleScopedClasses['app']} */ ;
/** @type {__VLS_StyleScopedClasses['app__header']} */ ;
/** @type {__VLS_StyleScopedClasses['app__title']} */ ;
/** @type {__VLS_StyleScopedClasses['app__cart-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['app__main']} */ ;
/** @type {__VLS_StyleScopedClasses['products']} */ ;
/** @type {__VLS_StyleScopedClasses['product-card']} */ ;
/** @type {__VLS_StyleScopedClasses['product-card__img']} */ ;
/** @type {__VLS_StyleScopedClasses['product-card__title']} */ ;
/** @type {__VLS_StyleScopedClasses['product-card__price']} */ ;
/** @type {__VLS_StyleScopedClasses['product-card__btn']} */ ;
/** @type {__VLS_StyleScopedClasses['cart']} */ ;
/** @type {__VLS_StyleScopedClasses['cart--open']} */ ;
/** @type {__VLS_StyleScopedClasses['cart__title']} */ ;
/** @type {__VLS_StyleScopedClasses['cart__empty']} */ ;
/** @type {__VLS_StyleScopedClasses['cart__items']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-item']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-item__img']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-item__details']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-item__title']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-item__price']} */ ;
/** @type {__VLS_StyleScopedClasses['cart-item__remove']} */ ;
/** @type {__VLS_StyleScopedClasses['cart__close']} */ ;
/** @type {__VLS_StyleScopedClasses['overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['details']} */ ;
/** @type {__VLS_StyleScopedClasses['details__img']} */ ;
/** @type {__VLS_StyleScopedClasses['details__title']} */ ;
/** @type {__VLS_StyleScopedClasses['details__price']} */ ;
/** @type {__VLS_StyleScopedClasses['details__remove']} */ ;
/** @type {__VLS_StyleScopedClasses['details__close']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SkeletonLoader: SkeletonLoader,
            items: items,
            cart: cart,
            isCartOpen: isCartOpen,
            selectedItem: selectedItem,
            loading: loading,
            toggleCart: toggleCart,
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            openItemDetails: openItemDetails,
            closeItemDetails: closeItemDetails,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
