<script lang="ts">
  import { fade } from "svelte/transition";
  export let navOpen;

  function closeNav() {
    navOpen = !navOpen;
  }
</script>

<section>
  <nav class="navbar {navOpen ? 'navbar--open' : ''}">
    <svg
      class="close-icon"
      on:click={closeNav}
      width="14"
      height="15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
        fill="#69707D"
        fill-rule="evenodd"
      />
    </svg>
    <ul class="navigation">
      <li class="navigation__item">Collections</li>
      <li class="navigation__item">Men</li>
      <li class="navigation__item">Women</li>
      <li class="navigation__item">About</li>
      <li class="navigation__item">Contact</li>
    </ul>
  </nav>
  {#if navOpen}
    <div transition:fade class="navbar__overlay" />
  {/if}
</section>

<style lang="scss">
  section {
    height: 100%;
    flex: 1;
  }

  .navbar {
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    width: 70vw;
    height: 100vh;
    background: var(--white);
    transition: 250ms ease-in-out;
    z-index: 10;

    @media (min-width: 1024px) {
      position: relative;
      transform: translateX(0);
      width: auto;
      height: 100%;
      padding-top: 0;
      padding-bottom: 0;
    }

    &--open {
      transform: translateX(0);
    }

    &__overlay {
      background: rgba(0, 0, 0, 0.75);
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;

      @media (min-width: 1024px) {
        display: none;
      }
    }
  }

  .close-icon {
    margin-bottom: 30px;

    @media (min-width: 1024px) {
      display: none;
    }
  }

  .navigation {
    font-weight: 700;

    @media (min-width: 1024px) {
      font-weight: 400;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 20px;
      height: 100%;
      align-items: center;
    }

    &__item {
      font-size: 20px;
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      @media (min-width: 1024px) {
        padding-top: 10px;
        padding-bottom: 0;
        color: var(--dark-electric-blue);
        font-size: 18px;
        height: 100%;
        border-bottom: 5px solid transparent;
        transition: 250ms ease-in-out;
        cursor: pointer;
      }

      &:hover {
        border-color: var(--heat-wave);
        color: var(--eerie-black);
      }
    }
  }
</style>
