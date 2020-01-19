<template>
  <v-container grid-list-md>
    <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs" :class="$vuetify.breakpoint.xs ? 'pa-0' : ''">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title>
              게시판
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                label="Search"
                single-line
                hide-details
                append-icon="mdi-magnify"
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="info"
              :search="search"
              loading loading-text="Loading... Please wait"
            ></v-data-table>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="test">
                글쓰기
              </v-btn>
            </v-card-actions>
          </v-card>
          {{a}}
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
  import axios from 'axios'

export default {
    asyncData(){
      return axios.get('http://localhost:3000/api/boardData')
          .then((res) => {
              return {info: res.data}
          })
    },
  data(){
      return{
          headers: [
              {text: 'author', value: 'author'},
              {text: 'title', value: 'title'},
              {text: 'date', value: 'date'}
          ],
          search: '',
          a: ''
      }
  },
    methods: {
        test(){
            axios.get('http://localhost:3000/api')
                .then(res => {
                    this.a = res.data
                })
                .catch(res => {
                    this.a = res.response.data
                })
        }
    }
}
</script>
