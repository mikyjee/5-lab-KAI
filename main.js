const { createApp } = Vue;

// Компонент product-details
const ProductDetails = {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details" :key="detail">{{ detail }}</li>
    </ul>
  `
};

// Компонент product
const Product = {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  components: {
    ProductDetails
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" :alt="altText" />
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>

        <p><span v-if="onSale" class="sale">Розпродаж!</span></p>
        <p>{{ sale }}</p>

        <p v-if="inStock">В наявності</p>
        <p v-else-if="selectedVariant.inventory > 0">Майже розпродано!</p>
        <p v-else>Немає на складі</p>

        <h3>Склад</h3>
        <product-details :details="details"></product-details>

        <h3>Колір</h3>
        <div class="color-boxes">
          <div v-for="(variant, index) in variants" :key="variant.id" class="color-box"
              :style="{ backgroundColor: variant.color }" @click="updateVariant(index)">
          </div>
        </div>

        <h3>Оберіть розмір</h3>
        <select v-model="selectedSize">
          <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
        </select>
        <p>Обраний розмір: {{ selectedSize }}</p>

        <button @click="addToCart" :disabled="!inStock">
          Додати у кошик
        </button>

        <p>Товарів у кошику: {{ cart }}</p>
        <p>Shipping: {{ shipping }}</p>

        <a :href="link" target="_blank">Більше подібних продуктів</a>
      </div>
    </div>
  `,
  data() {
    return {
      product: 'Шкарпетки',
      brand: 'Vue Mastery',
      description: 'Пара теплих пухнастих шкарпеток',
      altText: 'Пара шкарпеток',
      link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      selectedSize: 'M',
      onSale: true,
      cart: 0,
      variants: [
        {
          id: 2234,
          color: 'green',
          image: 'Socks-green.jpg',
          inventory: 10
        },
        {
          id: 2235,
          color: 'blue',
          image: 'Socks-grey.png',
          inventory: 0
        }
      ],
      selectedVariantIndex: 0
    };
  },
  computed: {
    selectedVariant() {
      return this.variants[this.selectedVariantIndex];
    },
    image() {
      return this.selectedVariant.image;
    },
    inStock() {
      return this.selectedVariant.inventory > 0;
    },
    title() {
      return `${this.product} ${this.brand}`;
    },
    sale() {
      return this.onSale
        ? `${this.product} від ${this.brand} зараз на розпродажі!`
        : `${this.product} від ${this.brand} зараз не на розпродажі.`;
    },
    shipping() {
      return this.premium ? 'Free' : 2.99;
    }
  },
  methods: {
    updateVariant(index) {
      this.selectedVariantIndex = index;
    },
    addToCart() {
      if (this.inStock) {
        this.cart++;
        this.selectedVariant.inventory--;
      }
    }
  }
};

// Кореневий застосунок
createApp({
  data() {
    return {
      premium: true
    };
  },
  components: {
    Product
  }
}).mount('#app');
