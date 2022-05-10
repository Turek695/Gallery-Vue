<template>
  <div class="slides-wrapper" :class="{ loading: isLoading || !images.length }">
    <template v-if="images.length">
      <button
        class="btn btn-primary btn-action btn-lg slides-prev"
        @click="changeSlide(-1)"
        :disabled="isLoading"
      >
        <i class="icon icon-arrow-left"></i>
      </button>

      <div class="slides">
        <slide
          :url="activeUrl"
          :number="number"
          :class="{ dimmed: isLoading }"
        />
      </div>

      <button
        class="btn btn-primary btn-action btn-lg slides-next"
        @click="changeSlide(1)"
        :disabled="isLoading"
      >
        <i class="icon icon-arrow-right"></i>
      </button>
    </template>
  </div>
</template>
		

<script>
import { preloadImage } from "../helpers/helpers.js";
import Slide from "./Slide.vue";

export default {
  name: "Slideshow",
  props: {
    images: {
      type: Array,
    },
  },
  data() {
    return {
      active: 0,
      isLoading: false,
    };
  },
  //    how to make first image appear when is fully loaded?
  ///////////////////////////////////////////////////////////
  //   watch: {
  //     images(newValue, oldValue) {
  //       if (oldValue.length === 0 && newValue.length !== 0) {
  //         preloadImage(this.activeUrl).then(() => {
  //           this.loaded = true;
  //         });
  //       }
  //     },
  //   },
  //   created() {
  //     this.isLoading = true;
  //     preloadImage(this.activeUrl).then(() => {
  //       this.isLoading = false;
  //     });
  //   },
  methods: {
    changeSlide(value) {
      let newIndex = this.active + value;
      if (newIndex >= 0) {
        newIndex %= this.images.length;
      } else {
        newIndex = this.images.length - 1;
      }
      this.active = newIndex;
      this.isLoading = true;
      preloadImage(this.images[newIndex].url).then(() => {
        this.isLoading = false;
      });
    },
  },
  computed: {
    activeUrl() {
      console.log(this.images[this.active].url);
      return this.images[this.active].url;
    },
    number() {
      return `${this.active + 1} / ${this.images.length}`;
    },
  },
  components: {
    Slide,
  },
};
</script>
<style scoped>
.slides-wrapper {
  min-height: 300px;
  position: relative;
}

.slides-next,
.slides-prev {
  position: absolute;
  top: 50%;

  transform: translateY(-50%);
}

.slides-prev {
  left: 0;
}

.slides-next {
  right: 0;
}
</style>
