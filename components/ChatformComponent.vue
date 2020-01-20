<template>
  <v-text-field
    ref="msg"
    label="Message..."
    outlined
    v-model="text"
    @click:append="send"
    @keydown.enter="send"
    append-icon="mdi-send-circle-outline"
    class="inputText"
  />
</template>

<script>
    import { mapState } from "vuex";
    export default {
        data: () => ({
            text: "",
        }),
        computed: {
            ...mapState(["user"]),
        },
        methods: {
            send() {
                if (this.text.length) {
                    this.$socket.emit(
                        "createMessage",
                        {
                            text: this.text,
                            id: this.user.id
                        },
                        data => {
                            this.text = "";
                        }
                    );
                }
            }
        }
    };
</script>

<style>
@media screen and (min-width: 1264px){
  .inputText{
    width: 700px;
  }
}
  @media screen and (min-width: 960px) and (max-width: 1263px){
    .inputText{
      width: 650px;
    }
  }
@media screen and (min-width: 600px) and (max-width: 959px){
  .inputText{
    width: 420px;
  }
}
@media screen and (max-width: 599px){
  .inputText{
    width: 300px;
  }
}
</style>
