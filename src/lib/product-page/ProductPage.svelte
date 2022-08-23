<script lang="ts">
  import Sneakers from "@/data/product.json";
  import type { Product } from "@/types/product";
  import cartIcon from "@/assets/icons/icon-cart.svg";
  import ProductGallery from '@/lib/product-page/ProductGallery.svelte';
  import { cartStore } from '../shared/CartStore';

  const product: Product = Sneakers;
  const productPrice = product.salePercentage
    ? (product.price / 100) * product.salePercentage
    : product.price;
  const onSale = product.salePercentage !== null;

  let productQuantity = 0;

  function increaseQuantity() {
    productQuantity++
  }

  function decreaseQuantity() {
    if (productQuantity > 0) {
      productQuantity--
    }
  }

  function addToCart() {
    cartStore.addToCart(product, productQuantity)
  }
</script>

<article class="product-page">
  <div class="product-page__gallery">
    <ProductGallery bind:images="{product.images}" bind:thumbnails="{product.thumbnails}"/>
  </div>
  <div class="product-page__product product">
    <p class="product__brand">{product.brand}</p>
    <h1 class="product__title">{product.title}</h1>
    <p class="product__description">{product.description}</p>
    <div class="product-price-row">
      <div class="product-price-row__current-price-section">
        <p class="product-price-row__current-price">
          ${productPrice.toFixed(2)}
        </p>
        {#if onSale}
          <p class="product-price-row__sale-badge">{product.salePercentage}%</p>
        {/if}
      </div>
      {#if onSale}
        <s class="product-price-row__rrp">${product.price.toFixed(2)}</s>
      {/if}
    </div>

    <footer class="product__footer">
      <div class="quantity-selector">
        <svg
          on:click={decreaseQuantity}
          class="quantity-selector__icon quantity-selector__icon--minus"
          width="12"
          height="4"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          ><path
            d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
            id="a"
          /></svg
        >
        <span class="quantity-selector__quantity">{productQuantity}</span>
        <svg
          on:click={increaseQuantity}
          class="quantity-selector__icon quantity-selector__icon--plus"
          width="12"
          height="12"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          ><path
            d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
            id="b"
          /></svg
        >
      </div>
      <button class="btn btn--primary" on:click={addToCart}>
        <span class="btn__icon-container">
          <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg"
            ><path
              d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
              fill="#ffffff"
              fill-rule="nonzero"
            /></svg
          >
        </span>
        <span class="btn__text">Add to cart</span>
      </button>
    </footer>
  </div>
</article>

<style lang="scss">
  .product-page {
    display: flex;
    flex-direction: column;
    gap: 15px;

    @media (min-width: 1024px) {
      gap: 70px;
      flex-direction: row;
      padding-top: 80px;
    }

    &__gallery {
      flex: 1;
    }

    &__product {
      max-width: 500px;
    }
  }
  .product {
    padding: 0 20px 20px;

    @media (min-width: 1024px) {
      margin: 80px 0 0;
    }

    &__brand {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 1.5px;
      color: var(--heat-wave);
      margin-bottom: 10px;
    }

    &__title {
      font-size: 30px;
      line-height: 35px;
      margin-bottom: 15px;

      @media (min-width: 1024px) {
        font-size: 50px;
        line-height: 55px;
      }
    }

    &__description {
      color: var(--dark-electric-blue);
      margin-bottom: 20px;
    }

    &__footer {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      margin-bottom: 15px;
      gap: 20px;

      @media (min-width: 1024px) {
        flex-direction: row;
      }
    }
  }

  .product-price-row {
    display: flex;
    align-items: center;

    @media (min-width: 1024px) {
      flex-direction: column;
      align-items: flex-start;
    }

    &__current-price-section {
      display: flex;
      align-items: center;
    }

    &__current-price {
      font-size: 27px;
      font-weight: 700;
    }

    &__sale-badge {
      background: var(--linen);
      color: var(--heat-wave);
      font-weight: 700;
      height: max-content;
      border-radius: 4px;
      text-align: center;
      padding: 2px 5px;
      margin-left: 10px;
      font-size: 14px;
    }

    &__rrp {
      flex: 1;
      text-align: right;
      color: var(--cadet-blue);
      font-weight: 700;
    }
  }

  .quantity-selector {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--ghost-white);
    border-radius: 8px;
    padding: 20px;

    @media (min-width: 1024px) {
      flex: 1 1 40%;
    }

    &__icon {
      path {
        fill: var(--heat-wave);
        fill-rule: nonzero;
        transition: 250ms ease-in-out;
        cursor: pointer;

        &:hover {
          opacity: 0.7;
        }
      }
    }

    &__quantity {
      font-weight: 700;
    }
  }
</style>
