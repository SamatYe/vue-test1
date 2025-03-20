<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import SkeletonLoader from './components/SkeletonLoader.vue'


interface Item {
  id: number
  title: string
  price: number
  imageUrl: string
}

const items = ref<Item[]>([])
const cart = ref<Item[]>([])
const isCartOpen = ref(false)
const selectedItem = ref<Item | null>(null)
const loading = ref(true) // <-- добавили loading

onMounted(async () => {
  try {
    const response = await axios.get('https://35c7fb3b6b9ec247.mokky.dev/items')
    items.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error)
  } finally {
    loading.value = false // <-- после загрузки убираем loading
  }

  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    cart.value = JSON.parse(savedCart)
  }
})

watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart))
}, { deep: true })

function toggleCart() {
  isCartOpen.value = !isCartOpen.value
}

function addToCart(item: Item) {
  if (!cart.value.some((i) => i.id === item.id)) {
    cart.value.push(item)
  }
}

function removeFromCart(id: number) {
  cart.value = cart.value.filter(item => item.id !== id)
}

function openItemDetails(item: Item) {
  selectedItem.value = item
}

function closeItemDetails() {
  selectedItem.value = null
}
</script>


<template>
  <div class="app">
    <header class="app__header">
      <h1 class="app__title">Магазин Кроссовок</h1>
      <button class="app__cart-btn" @click="toggleCart">
        🛒 Корзина ({{ cart.length }})
      </button>
    </header>

    <main class="app__main">
      <div class="products">
        <div
          v-for="item in items"
          :key="item.id"
          class="product-card"
          @click="openItemDetails(item)"
        >
          <img
            v-if="!loading"
            :src="item.imageUrl"
            :alt="item.title"
            class="product-card__img"
          />
          <SkeletonLoader
            v-else
            width="150px"
            height="150px"
            borderRadius="8px"
          />
          <h3 class="product-card__title">
            <SkeletonLoader v-if="loading" width="80%" height="20px" />
            <span v-else>{{ item.title }}</span>
          </h3>
          <p class="product-card__price">
            <SkeletonLoader v-if="loading" width="60%" height="20px" />
            <span v-else>{{ item.price }}₸</span>
          </p>
          <button
            v-if="!loading"
            class="product-card__btn"
            @click.stop="addToCart(item)"
          >
            Добавить в корзину
          </button>
          <SkeletonLoader
            v-else
            width="100%"
            height="36px"
            borderRadius="4px"
          />
        </div>
      </div>
    </main>

    <!-- Корзина -->
    <aside class="cart" :class="{ 'cart--open': isCartOpen }">
      <h2 class="cart__title">Корзина</h2>
      <div v-if="cart.length === 0" class="cart__empty">Корзина пуста</div>
      <div v-else class="cart__items">
        <div v-for="item in cart" :key="item.id" class="cart-item" @click="openItemDetails(item)">
          <img :src="item.imageUrl" class="cart-item__img" />
          <div class="cart-item__details">
            <h3 class="cart-item__title">{{ item.title }}</h3>
            <p class="cart-item__price">{{ item.price }}₸</p>
            <button class="cart-item__remove" @click.stop="removeFromCart(item.id)">Удалить</button>
          </div>
        </div>
      </div>
      <button class="cart__close" @click="toggleCart">Закрыть</button>
    </aside>

    <!-- Подробности товара -->
    <div v-if="selectedItem" class="overlay" @click="closeItemDetails">
      <div class="details" @click.stop>
        <img :src="selectedItem.imageUrl" class="details__img" />
        <h3 class="details__title">{{ selectedItem.title }}</h3>
        <p class="details__price">{{ selectedItem.price }}₸</p>
        <button class="details__remove" @click="removeFromCart(selectedItem.id)">Удалить</button>
        <button class="details__close" @click="closeItemDetails">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  font-family: Arial, sans-serif;
  background: #f0f0f0;
  min-height: 100vh;
}
.app__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #334;
  color: #fff;
  padding: 20px;
}
.app__title {
  font-size: 24px;
}
.app__cart-btn {
  background: #4CAF40;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
.products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}
.product-card {
  background: #fff;
  padding: 15px;
  width: 200px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  cursor: pointer;
}
.product-card__img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
}
.product-card__title {
  color: #000;
}
.product-card__price {
  color: #000;
}
.product-card__btn {
  background: #4CAF50;
  color: #fff;
  border: none;
  margin-top: 10px;
  padding: 8px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
}
.cart {
  position: fixed;
  top: 0;
  right: -520px;
  width: 400px;
  height: 100%;
  background: #fff;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0,0,0,0.2);
  transition: right 0.4s ease;
  overflow-y: auto;
  z-index: 1000;
}
.cart--open {
  right: 0;
}
.cart__title {
  font-size: 20px;
  margin-bottom: 20px;
  color: #1e1e1e;
}
.cart__empty {
  color: #000;
}
.cart__items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.cart-item {
  display: flex;
  align-items: center;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
}
.cart-item__img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}
.cart-item__details {
  margin-left: 10px;
  flex: 1;
}
.cart-item__title {
  color: #000;
}
.cart-item__price {
  color: #000;
}
.cart-item__remove {
  background: #ff4c4c;
  border: none;
  padding: 5px 10px;
  margin-top: 5px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.cart__close {
  margin-top: 20px;
  background: #333;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
}
.overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
}
.details {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}
.details__img {
  width: 100%;
  object-fit: cover;
}
.details__title {
  color: #000;
}
.details__price {
  color: #000;
}
.details__remove {
  background: #ff4c4c;
  border: none;
  padding: 8px 16px;
  margin-top: 10px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.details__close {
  margin-top: 10px;
  background: #333;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
