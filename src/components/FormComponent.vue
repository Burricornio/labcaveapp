<template lang="pug">
  v-form(ref="form").edit-movie__form
    v-text-field(label="Name" v-model="name")
    v-text-field(label="Email" v-model="email")
    v-select(label="Choose genre" v-model="select" :items="genres")
    v-text-field(label="Observations" name="observations" textarea)
    v-slider(label="Average" hint="Be honest" min="1" max="100" thumb-label v-model="average")
    v-menu(
        ref="menu"
        lazy
        :close-on-content-click="false"
         v-model="menu"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        min-width="290px"
        :return-value.sync="date"
    )
        v-text-field(slot="activator" label="Picker in menu" v-model="date" prepend-icon="event" readonly)
        v-date-picker(v-model="date" no-title scrollable)
    div.btn-actions
        v-btn(flat @click.native="exitForm") Exit
        v-btn(primary dark  @click.native.stop="editMovieDialog = true") Edit  movie data
</template>

<script>
export default {
  name: 'form-component',
  data () {
    return {
      menu: null,
      name: '',
      email: '',
      select: null,
      genres: [
        'Action',
        'Adventure',
        'Comedy',
        'Drama',
        'Horror'
      ],
      average: null,
      date: null
    }
  },
  methods: {
    exitForm () {
      this.$emit('exitForm', false)
    }
  }
}
</script>

<style scoped>
    .edit-movie__form {
        display: block;
        background: #000;
        width: 100%;
        height: 800px;
        padding: 40px 100px;
    }
    .btn-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;
    }
    @media (max-width: 667px) {
        .edit-movie__form {
            padding: 10px 30px;
            height: auto;
        }
        .btn-actions {
            margin: 20px 0;
        }
    }
</style>


