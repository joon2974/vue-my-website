<template>
  <v-btn-toggle v-model="choice">
    <v-btn value = "0">
      <span>Todo</span>
      <v-icon right>mdi-minus-box</v-icon>
    </v-btn>
    <v-btn value = "1">
      <span>Finished</span>
      <v-icon right>mdi-check-circle</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
      data(){
          return{
              choice: 0,
          }
      },
      computed: {
        ...mapMutations({
            setChoice: 'todo/setChoice'
        })
      },
      updated() {
          if(this.choice === 0){
              this.$store.commit('todo/setChoice', this.choice);
          }else{
              this.$store.commit('todo/setChoice', this.choice);
          }
      }
  }
</script>

