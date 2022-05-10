import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h =>
    h(App, {
      props: {
        endpoint:
          "https://gist.githubusercontent.com/Turek695/78e18be80f0c09633d083ba84eaeadea/raw/64e1661a2447f20c3a7f477c7aa85fac649a2841/images.json"
      }
    })
});
