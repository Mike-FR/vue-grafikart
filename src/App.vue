<template>
  <div id="app">
    <carousel>
      <carousel-slide v-for="n in slides" :index="n-1">
        <img :src="'https://picsum.photos/id/'+n+'/600/300'" alt width="100%" />
      </carousel-slide>
    </carousel>
    <div class="carousel-btn">
      <button @click="addSlides">Add slides</button>
      <button @click="removeSlides">Remove slides</button>
    </div>

    <hr style="margin: 30px" />

    <todos v-model="todos"></todos>
    <todos v-model="todos"></todos>
    <todos></todos>
    <button @click="addTodo">Add task</button>
  </div>
</template>

<script>
import Todos from "./components/Todos";
import Carousel from "./components/carousel/Carousel";
import CarouselSlide from "./components/carousel/CarouselSlide";

export default {
  name: "App",
  components: {
    Todos,
    Carousel,
    CarouselSlide
  },
  data() {
    return {
      slides: 5,
      todos: [
        {
          name: "Démo",
          completed: true
        }
      ]
    };
  },
  methods: {
    addTodo() {
      this.todos.push({
        name: "Jean",
        completed: false
      });
    },
    addSlides() {
      this.slides++;
    },
    removeSlides() {
      this.slides--;
    }
  }
};
</script>

<style>
.carousel-btn {
  text-align: center;
}

.carousel-btn button {
  border: 1px solid gray;
  padding: 5px;
  margin: 5px;
}
</style>
