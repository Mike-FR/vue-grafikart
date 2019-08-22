<template>
  <div class="carousel">
    <slot></slot>
    <button class="carousel__nav carousel__next" @click="next">></button>
    <button class="carousel__nav carousel__prev" @click="prev"><</button>
    <div class="carousel__pagination">
      <button v-for="n in slidesCount" @click="goto(n-1)" :class="{active: n-1 == index}"></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      slides: [],
      direction: "right"
    };
  },
  watch: {
    slides() {
      if (this.index >= this.slidesCount) {
        this.index = this.slidesCount - 1;
      }
    }
  },
  computed: {
    slidesCount() {
      return this.slides.length;
    }
  },
  methods: {
    next() {
      this.index++;
      this.direction = "right";
      if (this.index >= this.slidesCount) {
        this.index = 0;
      }
    },
    prev() {
      this.index--;
      this.direction = "left";
      if (this.index < 0) {
        this.index = this.slidesCount - 1;
      }
    },
    goto(index) {
      this.direction = index > this.index ? "right" : "left";
      this.index = index;
    }
  },
  mounted() {
    this.slides = this.$children;
  }
};
</script>

<style>
.carousel {
  position: relative;
  overflow: hidden;
}

.carousel__nav {
  position: absolute;
  top: 50%;
  left: 10px;
  border: 1px solid white;
  padding: 5px;
  color: white;
  font-weight: bold;
  box-shadow: 1px 1px 1px grey;
  text-shadow: 1px 1px 1px black;
}

.carousel__nav.carousel__next {
  left: auto;
  right: 10px;
}

.carousel__pagination {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.carousel__pagination button {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: black;
  opacity: 0.8;
  border-radius: 10px;
  margin: 0 2px;
  cursor: pointer;
}

.carousel__pagination button.active {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: white;
  opacity: 0.8;
  border-radius: 10px;
}
</style>