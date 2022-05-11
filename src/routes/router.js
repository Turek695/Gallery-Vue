import Vue from "vue";
import Router from "vue-router";
import Slideshow from "../components/Slideshow.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/slide/1"
    },
    {
      path: "/slide/:index",
      component: Slideshow
    }
  ]
});
