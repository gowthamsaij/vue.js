<template>

<div class="card_data align-items-center ">

    <b-card style="max-width: 25rem;" class="mb-2 shadow p-3 mb-5 bg-white rounded">
        <b-alert variant="danger" dismissible v-model="showDismissibleAlert">
            {{ alertMessage }}
        </b-alert>
        <img v-bind:src="img" alt="" class="img-responsive">
        <hr> <h3 style="text-align: center;">Admin Login Panel</h3> <hr>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="username" label="Username:" label-for="username" class="font-weight-bold">
                <b-form-input id="username" type="email" v-model="form.username" required placeholder="Enter username" />
            </b-form-group>

            <b-form-group id="password" label="Password:" label-for="password" class="font-weight-bold">
                <b-form-input id="password" type="password" v-model="form.password" required placeholder="Enter password" />
            </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-card>

</div>

</template>

<style>
.card_data {
    padding-top: 100px;
}
.card {
    margin: 0 auto; /* Added */
    float: none; /* Added */
    margin-bottom: 10px; /* Added */
}
.img-responsive {
    display: block;
    height: auto;
    max-width: 100%;
    margin:0 auto;
}
</style>

<script>

import Vuex from 'vuex'

export default {

    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        show: true,
        alertMessage : 'Wrong Credentials',
        showDismissibleAlert: false,
        img: require('../logo.png')
      }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            var bodyFormData = new FormData();
            bodyFormData.set('username', this.form.username);
            bodyFormData.set('password', this.form.password);
            this.axios({
                method: 'post',
                url: 'http://localhost/webcash/api/v2/merchants/tokenAdmin.json?hash_key=28a196fd38af3065ba85344dc3b1e171fa45cf34&skip=true',
                data: bodyFormData
                })
                .then( (response) =>  {
                    if (response.data.success == true) {
                        const token = response.data['data'].token
                        const user = 'admin'
                        localStorage.setItem('access_token',token)
                        localStorage.setItem('user_access',user)
                        this.$store.commit('change',token)
                        this.$store.commit('userAcessState',user)
                        this.$router.push('/dashboard')
                    } else {
                        localStorage.removeItem('access_token')
                        localStorage.removeItem('user_access')
                        this.$store.commit('logOut',null)
                        this.alertMessage = response.data.message
                        this.showDismissibleAlert = true;
                        this.$router.push('/admin/login')
                        this.onReset()
                    }
                })
                .catch(function (response) {
                    this.$router.push('/admin/login')
                });
        },

        onReset(evt) {
            evt.preventDefault()
            /* Reset our form values */
            this.form.username = ''
            this.form.password = ''
            /* Trick to reset/clear native browser form validation state */
            this.show = false
            this.$nextTick(() => {
              this.show = true
            })
          }
        },
  }

</script>

