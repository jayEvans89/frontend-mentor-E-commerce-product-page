<script lang="ts">
  import logo from "../../../assets/logo.svg";
  import Navbar from "./nav/Navbar.svelte";
  import Basket from '@/lib/shared/basket/Basket.svelte'
  import avatar from '@/assets/avatar.png'

  let navOpen = false;

  function openNav() {
    navOpen = true;
  }
</script>

<header>
  <svg on:click={openNav} class="hamburger" width="16" height="15" xmlns="http://www.w3.org/2000/svg"
    ><path
      d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z"
      fill="#69707D"
      fill-rule="evenodd"
    /></svg
  >

  <img src={logo} alt="logo" />

  <Navbar bind:navOpen />

  <Basket/>

  <div class="profile-logo__container">
    <img class="profile-logo__logo" src="{avatar}" alt="Avatar">
  </div>
</header>

<style lang="scss">
  header {
    height: 80px;
    background: var(--white);
    display: flex;
    align-items: center;
    gap: 50px;
    padding: 0 20px;
    position: relative;

    @media (min-width: 1024px) {
      height: 140px;
      border-bottom: 1px solid var(--cadet-blue);
    }
  }

  .hamburger {
    @media (min-width: 1024px) {
      display: none;
    }
  }

  .profile-logo {
    &__container {
      width: 72px;
      height: 72px;
      cursor: pointer;
      transition: 250ms ease-in-out;
      border-radius: 50%;
      border: 2px solid transparent;

      &:hover {
        border-color: var(--heat-wave);
      }
    }

    &__logo {
      // width: 50px;
      // height: 50px;
    }
  }
</style>
