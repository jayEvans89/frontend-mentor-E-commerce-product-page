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
  <p on:click={goPrevious}>Previous</p>
  <p on:click={goNext}>Next</p>
</section>

<style lang="scss">
  .product-gallery {
    &__main-carousel {
      display: flex;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
    }
  }
</style>
