<template>
  <div id="app">
    <h1>Gallery</h1>
    <router-view :images="images" />
  </div>
</template>


<script>
import axios from "axios";
import Slideshow from "./components/Slideshow.vue";

export default {
  name: "App",
  props: {
    endpoint: String,
  },
  data() {
    return {
      images: [],
    };
  },
  components: { Slideshow },
  created() {
    axios.get(this.endpoint).then((res) => {
      this.images = res.data.GirlImages;
    });
  },
};
</script>
