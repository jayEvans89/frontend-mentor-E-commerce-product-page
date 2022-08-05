<script lang="ts">
  import Header from './lib/shared/header/Header.svelte'
  import ProductPage from './lib/product-page/ProductPage.svelte';
</script>

<main>
  <Header/>
  <ProductPage/>
</main>

<style lang="scss">
  main {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
