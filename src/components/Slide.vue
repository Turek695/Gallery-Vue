<template>
  <figure class="figure">
    <img class="img-responsive" :src="url" alt="" />
    <figcaption class="text-center text-gray mt-2">{{ number }}</figcaption>
  </figure>
</template>

<script>
export default {
  name: "Slide",
  props: {
    url: String,
    number: String,
  },
};
</script>

<style scoped>
figure.figure {
  transition: opacity 0.2s ease-in-out;
  height: 100%;
}

img {
  max-height: 100%;
}

.dimmed {
  opacity: 0.5;
}
</style>
