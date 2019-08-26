<template>
  <div class="lightbox" v-if="image" @click="close">
    <transition :name="transition">
      <lightbox-image :image="image" :key="image"></lightbox-image>
    </transition>
    <font-awesome-icon class="lightbox__close" icon="window-close" size="2x" @click="close" />
    <font-awesome-icon
      class="lightbox__btn lightbox__next"
      icon="caret-square-right"
      size="3x"
      @click.stop.prevent="next"
    />
    <font-awesome-icon
      class="lightbox__btn lightbox__prev"
      icon="caret-square-left"
      size="3x"
      @click.stop.prevent="prev"
    />
  </div>
</template>


<script>
import "./LightboxDirective";
import store from "./LightboxStore";
import LightboxImage from "./LightboxImage";

export default {
  components: {
    LightboxImage
  },
  data() {
    return {
      state: store.state,
      direction: "next"
    };
  },
  methods: {
    close() {
      store.close();
    },
    next() {
      this.direction = "next";
      store.next();
    },
    prev() {
      this.direction = "prev";
      store.prev();
    }
  },
  computed: {
    image() {
      if (this.state.index !== false) {
        return this.state.images[this.state.index];
      }
    },
    transition () {
        return 'lightbox-' + this.direction
    }
  }
};
</script>

<style src="./lightbox.scss" lang="scss">
</style>>

</style>