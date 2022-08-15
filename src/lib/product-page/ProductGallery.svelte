<script lang="ts">
  import { onMount } from "svelte";

  export let images: string[];

  let activeIndex = 0;
  let container;
  let elements;
  let snapType = "none";

  onMount(() => {
    container = document.querySelector("#mainCarousel");
    elements = [...document.querySelectorAll("#mainCarousel img")];

    const observer = new IntersectionObserver(handleIntersect, {
      root: container,
      rootMargin: "0px",
      threshold: 0.75,
    });

    elements.forEach((el) => {
      observer.observe(el);
      console.log(el.src);
    });

    setTimeout(() => {
      snapType = "start";
    }, 100);
  });

  function handleIntersect(entries) {
    const entry = entries.find((e) => e.isIntersecting);
    if (entry) {
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
</script>

<section class="product-gallery">
  <div class="product-gallery__main-carousel" id="mainCarousel">
    {#each images as image}
      <img
        class="product-gallery__image"
        src={`./product-images/${image}`}
        alt="Gallery"
        style="scroll-snap-align: {snapType}"
      />
    {/each}
  </div>
  <span class="product-gallery__nav-icon product-gallery__nav-icon--previous" on:click={goPrevious}>
    <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg"
      ><path
        d="M11 1 3 9l8 8"
        stroke="#1D2026"
        stroke-width="3"
        fill="none"
        fill-rule="evenodd"
      /></svg
    >
  </span>
  <span class="product-gallery__nav-icon product-gallery__nav-icon--next" on:click={goNext}>
    <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"
      ><path
        d="m2 1 8 8-8 8"
        stroke="#1D2026"
        stroke-width="3"
        fill="none"
        fill-rule="evenodd"
      /></svg
    ></span
  >
</section>

<style lang="scss">
  .product-gallery {
    position: relative;

    &__main-carousel {
      display: flex;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
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

      &--previous {
        left: 15px;
      }

      &--next {
        right: 15px;
      }
    }
  }
</style>
