<template>
  <v-row justify="space-around">
    <v-col cols="12" sm="11" md="11" lg="11">
      <v-sheet elevation="10" class="pa-4">
        <v-chip-group column>
          <v-chip
            color="#E6E6E6"
            v-for="(name, index) in chipList"
            :key="`user - ${index}`">
            <v-avatar left>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{name}}
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
    export default{
        props: ['chipList']
    }
</script>
