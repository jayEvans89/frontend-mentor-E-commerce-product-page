<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import ProductGallery from "./ProductGallery.svelte";
  import IconClose from "@/assets/icons/icon-close.svg";

  export let images: string[];
  export let thumbnails: string[];

  const dispatch = createEventDispatcher();

  function closeLightbox() {
    dispatch("closeLightbox");
  }
</script>

<div class="lightbox">
  <div class="lightbox__content">
    <svg
      on:click={closeLightbox}
      class="lightbox__close"
      viewBox="0 0 14 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
        fill-rule="evenodd"
      />
    </svg>

    <ProductGallery
      {images}
      {thumbnails}
      lightbox={true}
      carouselId="lightbox"
    />
  </div>
</div>

<style lang="scss">
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;

    &__content {
      position: relative;
    }

    &__close {
      position: absolute;
      top: -65px;
      right: 0;
      height: 40px;
      cursor: pointer;

      &:hover {
        path {
          fill: var(--heat-wave);
      }
      }

      path {
        transition: 250ms ease-in-out;
        fill: #69707d;
      }
    }
  }
</style>
