<template>
  <div class="slides-wrapper" :class="{ loading: isLoading || !loaded }">
    <template v-if="loaded">
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
      active: Number(this.$route.params.index - 1),
      isLoading: false,
      loaded: false,
      buttonSwitch: false,
    };
  },

  watch: {
    images(newValue, oldValue) {
      if (oldValue.length === 0 && newValue.length !== 0) {
        preloadImage(this.activeUrl).then(() => {
          this.loaded = true;
        });
      }
    },
    $route() {
      if (!this.buttonSwitch) {
        this.changeSlide(0, Number(this.$route.params.index));
      }
      this.buttonSwitch = false;
    },
  },
  methods: {
    changeSlide(factor, value = false) {
      let newIndex;
      if (value) {
        this.buttonSwitch = false;
        newIndex = value - 1;
      } else {
        this.buttonSwitch = true;
        newIndex = this.active + factor;
        if (newIndex >= 0) {
          newIndex %= this.images.length;
        } else {
          newIndex = this.images.length - 1;
        }
      }

      this.isLoading = true;
      preloadImage(this.images[newIndex].url).then(() => {
        this.active = newIndex;
        this.isLoading = false;
        this.$router.push(`/slide/${this.active + 1}`); // www address update
        if (value != false) {
          console.log("jest");
        }
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
