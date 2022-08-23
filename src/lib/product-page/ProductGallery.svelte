<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Lightbox from "./Lightbox.svelte";

  export let images: string[];
  export let thumbnails: string[];
  export let lightbox = false;
  export let carouselId = "mainCarousel";

  let activeIndex = 0;
  let container;
  let elements;
  let snapType = "none";
  let imageClick = false;
  let showLightbox = false;

  onMount(() => {
    container = document.querySelector(`#${carouselId}`);
    elements = [...document.querySelectorAll(`#${carouselId} img`)];

    const observer = new IntersectionObserver(handleIntersect, {
      root: container,
      rootMargin: "0px",
      threshold: 0.75,
    });

    elements.forEach((el) => {
      observer.observe(el);
    });

    setTimeout(() => {
      snapType = "start";
    }, 100);
  });

  function handleIntersect(entries) {
    const entry = entries.find((e) => e.isIntersecting);
    if (entry && !imageClick) {
      const index = elements.findIndex((e) => e === entry.target);
      activeIndex = index;
    }
  }

  function goPrevious() {
    let index = elements.length - 1;
    if (activeIndex > 0) {
      index = activeIndex - 1;
    }
    elements[index].scrollIntoView({
      behavior: "smooth",
    });
  }

  function goNext() {
    let index = 0;
    if (activeIndex < elements.length - 1) {
      index = activeIndex + 1;
    }

    elements[index].scrollIntoView({
      behavior: "smooth",
    });
  }

  function goToImage(index: number) {
    imageClick = true;
    activeIndex = index;
    elements[index].scrollIntoView({
      behavior: "smooth",
    });

    setTimeout(() => {
      imageClick = false;
    }, 500);
  }

  function toggleLightbox() {
    const windowWidth = window.innerWidth
    if (windowWidth >= 1024) {
      showLightbox = true
    }
  }

  function closeLightbox() {
    showLightbox = false;
  }
</script>

<section class="product-gallery {lightbox ? 'product-gallery--light-box' : ''}">
  <div class="product-gallery__main-carousel">
    <div class="product-gallery__image-container" id={carouselId}>
      {#each images as image}
        <img
          on:click={toggleLightbox}
          class="product-gallery__image"
          src={`./product-images/${image}`}
          alt="Gallery"
          style="scroll-snap-align: {snapType}"
        />
      {/each}
    </div>
    <span
      class="product-gallery__nav-icon product-gallery__nav-icon--previous {lightbox
        ? 'product-gallery__nav-icon--lightbox product-gallery__nav-icon--previous-lightbox'
        : ''}"
      on:click={goPrevious}
    >
      <svg viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M11 1 3 9l8 8"
          stroke-width="3"
          fill="none"
          fill-rule="evenodd"
        /></svg
      >
    </span>
    <span
      class="product-gallery__nav-icon product-gallery__nav-icon--next {lightbox
        ? 'product-gallery__nav-icon--lightbox product-gallery__nav-icon--next-lightbox'
        : ''}"
      on:click={goNext}
    >
      <svg viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg"
        ><path
          d="m2 1 8 8-8 8"
          stroke-width="3"
          fill="none"
          fill-rule="evenodd"
        /></svg
      ></span
    >
  </div>

  <section
    class="thumbnail-gallery {lightbox ? 'thumbnail-gallery--center' : ''}"
  >
    {#each thumbnails as image, index}
      <div
        on:click={() => goToImage(index)}
        class="thumbnail-gallery__image-container {index === activeIndex
          ? 'thumbnail-gallery__image-container--active'
          : ''}"
      >
      <img
      class="thumbnail-gallery__image"
      src={`./product-images/${image}`}
      alt="Thumbnail Gallery"
      />
      <span class="thumbnail-gallery__overlay {index === activeIndex ? 'thumbnail-gallery__overlay--active' : ''}" />
      </div>
    {/each}
  </section>
  {#if showLightbox}
    <div transition:fade>
      <Lightbox {images} {thumbnails} on:closeLightbox={closeLightbox} />
    </div>
  {/if}
</section>

<style lang="scss">
  .product-gallery {
    position: relative;

    &--light-box {
      // position: fixed;
      width: 800px;
    }

    &__main-carousel {
      position: relative;
    }

    &__image-container {
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      position: relative;
      display: flex;

      @media (min-width: 1024px) {
        border-radius: 20px;
      }
    }

    &__image {
      cursor: pointer;
    }

    &__nav-icon {
      background: var(--white);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;

      svg {
        height: 18px;
        stroke: #1d2026;
      }

      @media (min-width: 1024px) {
        display: none;
      }

      &--lightbox {
        display: flex;
        width: 80px;
        height: 80px;

        svg {
          height: 28px;
          transition: 250ms ease-in-out;
          cursor: pointer;

          &:hover {
            stroke: var(--heat-wave);
          }
        }
      }

      &--previous {
        left: 15px;
      }

      &--next {
        right: 15px;
      }

      &--previous-lightbox {
        left: -40px;
      }

      &--next-lightbox {
        right: -40px;
      }
    }
  }

  .thumbnail-gallery {
    display: none;
    gap: 15px;
    margin-top: 30px;

    @media (min-width: 1024px) {
      display: flex;
    }

    &--center {
      justify-content: center;
    }

    &__image-container {
      border-radius: 15px;
      width: 148px;
      height: 148px;
      overflow: hidden;
      border: 3px solid transparent;
      position: relative;
      cursor: pointer;

      &--active {
        border-color: var(--heat-wave);
      }

      &:hover {
        .thumbnail-gallery__overlay {
          opacity: 1;
        }
      }
    }

    &__overlay {
      background: rgba(255, 255, 255, 0.7);
      height: 100%;
      width: 100%;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: 250ms ease-in-out;

      &--active {
        opacity: 1;
      }
    }
  }
</style>
