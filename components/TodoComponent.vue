<template>
  <div>
    <span>{{todoInfo.todo}}왜 안나와</span>
    <v-spacer></v-spacer>
    <v-icon v-if="todoInfo.complete">mdi-check-circle</v-icon>
    <v-icon v-else>mdi-minus-box</v-icon>
  </div>
</template>

<script>
  export default {
      props: ['todoInfo']
  }
</script>
