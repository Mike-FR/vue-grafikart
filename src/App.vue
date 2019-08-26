<template>
  <div id="app">
    <router-view />
    <div v-if="title === 'laptop'">
      <a :href="'https://picsum.photos/id/'+n+'/800/600'" v-lightbox v-for="n in 9">
        <img :src="'https://picsum.photos/id/'+n+'/150/150'" />
      </a>
    </div>
    <section>
      <div v-if="title === 'landscape'">
        <a :href="'https://picsum.photos/id/1'+n+'/800/600'" v-lightbox v-for="n in 9">
          <img :src="'https://picsum.photos/id/1'+n+'/150/150'" />
        </a>
      </div>
    </section>
    <button @click="title = 'laptop'">Laptop</button>
    <button @click="title = 'landscape'">Landscape</button>
    <lightbox></lightbox>
  </div>
</template>

<script>
import Lightbox from "./components/lightbox/Lightbox";

export default {
  name: "App",
  data() {
    return {
      title: "laptop"
    };
  },
  components: {
    Lightbox
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
