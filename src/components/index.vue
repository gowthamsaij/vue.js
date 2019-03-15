<template>
    <div>
<hr>
    <!-- <b-button @click="showModal">Open Modal <font-awesome-icon icon="coffee" /> </b-button> -->
    <b-modal ref="myModalRef" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
    </b-modal>


    <b-row>
    <b-col>
        <b-card class="card text-white bg-warning o-hidden h-100">
            <b-card-text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>
        </b-card>
    </b-col>
  </b-row>
  &nbsp;
  &nbsp;
  <b-row>
    <b-col>
        <b-card class="card text-white bg-success o-hidden h-100">
            <b-card-text>
             Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>
        </b-card>
    </b-col>
  </b-row>

    </div>
</template>
<script>

export default {

  name: 'index',
  data () {
    return {
      message: 'test'
    }
  },
  methods : {
    showModal() {
        this.$refs.myModalRef.show()
      },
      hideModal() {
        this.$refs.myModalRef.hide()
    },
    getUserAccess(){
        this.useraccess = localStorage.getItem('user_access')
        // console.log(this.useraccess)
    }
},
    created() {
        this.getUserAccess()
    }
}
</script>
<style>

.jumbotron {
    padding: 2rem 2rem;
}


</style>

