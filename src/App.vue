<template lang="pug">
  v-app(dark)
    v-container(grid-list-md xs12 lg8).app__container
      v-layout
        v-flex(xs12)
          v-toolbar.toolbar
            img(src="./assets/labCaveLogo.png").toolbar__logo
            v-toolbar-title.toolbar__title LABCAVE 2018 MOVIE LIST
          v-content
            data-table
</template>


<script>
import DataTable from './components/DataTable'

export default {
  components: {
    DataTable
  }
}
</script>

<style scoped>
  .toolbar {
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .toolbar__logo {
    width: 60px;
  }
  .toolbar__title {
    font-family: 'Archivo Black', sans-serif;
  }
  @media only screen and (min-width: 1904px) {
    .app__container {
      max-width: 1200px;
    }
  }
  @media only screen and (max-width: 500px) {
    .toolbar__title {
      font-size: 14px;
    }
  }
</style>

