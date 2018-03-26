<template lang="pug">
    section
        div.search-box__container
            v-text-field(
            color="white"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
            ).search-box__field
        v-data-table(
            :headers="headers"
            :items="movies"
            :search="search"
            :pagination.sync="pagination"
            class="elevation-1"
            hide-actions
        )
            template(slot="headerCell" slot-scope="props")
                span  {{ props.header.text }}
            template(slot="items" slot-scope="props")
                td.table-item
                    img(:src="'https://image.tmdb.org/t/p/w58_and_h87_bestv2/' + props.item.poster_path").data-table__image
                td.table-item {{ props.item.original_title }}
                td.table-item {{ props.item.popularity}}
                td.table-item {{ props.item.release_date }}
                td.table-item
                    v-btn(primary dark slot="activator" @click.native.stop="moreInfoMovie(props.item)") More Info
        v-dialog(v-model="moreInfoMovieDialog" persistent full-width max-width="800px")
            article.dialog-moreInfoMovie__container
                div.dialog-moreInfoMovie__poster
                    img(v-if="infoMovieData.poster_path" :src="'https://image.tmdb.org/t/p/w200/' + infoMovieData.poster_path")
                div.dialog-moreInfoMovie__info
                    h2.dialog-moreInfoMovie__title {{ infoMovieData.title }}
                    span.dialog-moreInfoMovie__overview Overview:
                    div.dialog-moreInfoMovie__text {{ infoMovieData.overview }}
                    div.dialog-moreInfoMovie__data
                        span Average:  {{ infoMovieData.vote_average }}
                        span Number of votes:  {{ infoMovieData.vote_count}}
                        span Popularity:  {{ infoMovieData.popularity}}
                    div.btn-container
                        v-card-actions.btn-container__actions
                            v-btn(flat @click.native="moreInfoMovieDialog = false") Exit
                            v-btn(primary dark slot="activator" @click.native.stop="editMovieDialog = true") Edit  movie data
                            v-dialog(v-model="editMovieDialog" full-width max-width="800px" persistent )
                                div.form-container
                                    form-component(@exitForm="editMovieDialog = false")

        div.text-xs-center.pt-2
            v-pagination(v-model="pagination.page" :length="pages" color="blue darken-2").prueba
</template>

<script>
import FormComponent from './FormComponent'
import {HTTP} from '../main'

export default {
  data () {
    return {
      infoMovieData: {},
      moreInfoMovieDialog: false,
      editMovieDialog: false,
      movies: [],
      errors: [],
      search: '',
      selected: [],
      headers: [
        {
          text: 'Poster',
          align: 'left',
          sortable: false,
          value: 'poster'
        },
        { text: 'Title', value: 'title' },
        { text: 'Popularity', value: 'popularity' },
        { text: 'Release date', value: 'release date' },
        { text: ' ', value: 'release' }
      ],
      pagination: {
        rowsPerPage: 8
      }
    }
  },
  components: {
    FormComponent
  },
  computed: {
    // Propiedad computada para otener el páginado
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    // Propiedad computada para ordenart el listado desde la carga
    pag () {
      return this.pagination.sortBy
    }
  },
  methods: {
    // Función que lanza el 'dialog' y recibe los datos del item en cuestión
    moreInfoMovie (item) {
      this.infoMovieData = Object.assign({}, item)
      this.moreInfoMovieDialog = true
    }
  },
  created () {
    // Llamada a la API de TMDB
    HTTP.get(`movies`)
    .then(response => {
      this.movies = response.data.results.sort((a, b) => {
        if (a.title > b.title) {
          return 1
        }
        if (a.title < b.title) {
          return -1
        }
        return this.movies[this.activeIndex]
      })
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style scoped>
    .search-box__container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 18px;
    }
    .search-box__field {
        max-width: 360px;
    }
    .table-item {
        max-width: 130px;
    }
   .dialog-moreInfoMovie {
       width: 20%;
    }
    .dialog-moreInfoMovie__container {
       display: flex;
       flex-direction: row;
       background: #000;
       height: 360px;
       padding: 20px;
    }
    .dialog-moreInfoMovie__data {
        display: flex;
        justify-content: space-between;
        margin: 20px;
    }
    .data-table__image {
        display: block;
        margin: 10px 0;
    }
    .dialog-moreInfoMovie__poster, .dialog-moreInfoMovie__info {
        padding: 10px;
    }
    .dialog-moreInfoMovie__info {
        padding-right: 20px;
    }
    .dialog-moreInfoMovie__title {
        text-align: center;
        margin: 10px;
    }
    .dialog-moreInfoMovie__text {
        margin: 6px 20px 20px 20px;
        overflow-y: scroll;
        max-height: 110px;
        min-height: 110px;
    }
    .dialog-moreInfoMovie__overview, .data span + span {
        margin-left: 20px;
    }
    .btn-container {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .btn-container__actions {
        padding-right: 10px;
    }
    .form-container {
        width: 100%;
    }
    .prueba  button:focus {
        outline: none!important;
        border: none!important;
    }
    @media (max-width: 700px) {
        .table-item {
            max-width: 100%;
        }
        .search-box__field {
            max-width: 100%;
        }
        .dialog-moreInfoMovie__container {
            flex-direction: column;
            height: auto;
        }
        .dialog-moreInfoMovie__data {
            flex-direction: column;
            margin: 20px;
        }
        .dialog-moreInfoMovie__poster {
            text-align: center;
        }
        .dialog-moreInfoMovie__text {
            max-height: none;
        }
    }
</style>



