<template>
  <div id="app">
    <div id="nav">
      <template v-for="(link, index) in links">
        <router-link
          :key="link.code"
          :to="`/${link.code}`"
        >
          {{ link.label }}
        </router-link>
        <span
          :key="index"
          v-if="!isLastLink(index)"> | </span>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      links: [{
        code: 'characters',
        label: 'Characters'
      },
      {
        code: 'locations',
        label: 'Locations'
      },
      {
        code: 'episodes',
        label: 'Episodes'
      }]
    }
  },
  methods: {
    isLastLink(index) {
      return index == (this.links.length - 1)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-active {
  color: #42b983;
}
</style>
