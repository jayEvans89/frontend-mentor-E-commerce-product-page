<script lang="ts">
  import { fade } from "svelte/transition";
  let showBasket = false;
  let leaveTimeout;

  function basketHover() {
    clearTimeout(leaveTimeout);
    showBasket = true;
  }

  function hideBasket() {
    leaveTimeout = setTimeout(() => {
      showBasket = false;
    }, 200);
  }

  function toggleBasket() {
    showBasket = !showBasket
  }
</script>

<div class="mini-cart-container">
  <svg
    on:mouseenter={basketHover}
    on:mouseleave={hideBasket}
    on:touchstart="{toggleBasket}"
    class="basket-icon"
    width="22"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    ><path
      d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
      fill-rule="nonzero"
    /></svg
  >
  {#if showBasket}
    <section
      class="mini-cart"
      transition:fade
      on:mouseenter={basketHover}
      on:mouseleave={hideBasket}
    >
      <header class="mini-cart__header">
        <h2 class="mini-cart__title">Cart</h2>
      </header>
      <div class="mini-cart__body">
        <div class="mini-cart__empty-message-container">
          <p class="mini-cart__empty-message">Your cart is empty.</p>
        </div>
      </div>
    </section>
  {/if}
</div>

<style lang="scss">
  .basket-icon {
    cursor: pointer;
    path {
      fill: #69707d;
      transition: 250ms ease-in-out;
    }

    &:hover {
      path {
        fill: var(--eerie-black);
      }
    }
  }

  .mini-cart-container {
    position: relative;
  }

  .mini-cart {
    position: fixed;
    width: calc(100vw - 20px);
    top: 80px;
    left: 15px;
    z-index: 11;
    background: var(--white);
    border-radius: 8px;
    box-shadow: 0 25px 36px -6px rgba(0 0 0 / 23%);

    @media (min-width: 1024px) {
      position: absolute;
      width: 400px;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
    }

    &__header {
      height: 70px;
      border-bottom: 1px solid var(--gainsboro);
      display: flex;
      align-items: center;
      padding: 20px;
    }

    &__title {
      font-size: 17px;
    }

    &__body {
      height: 200px;
    }

    &__empty-message-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    &__empty-message {
      font-weight: 700;
      color: var(--dark-electric-blue);
    }
  }
</style>
