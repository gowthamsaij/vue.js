<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light2 border-bottom">
            <button class="btn btn-default" id="menu-toggle" v-on:click="onClick"><span class="fa fa-list"></span></button>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto mt-2 mt-lg-0">

                <li class="nav-item">
                    <b-nav-item-dropdown right>
                      <template slot="button-content"><i class="fas fa-user-circle fa-lg" ></i></template>
                      <!-- <b-dropdown-item>Profile</b-dropdown-item> -->
                      <b-dropdown-item href="/logout">Signout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </li>
              </ul>
            </div>
      </nav>
    </div>
</template>
<script>

export default {
    name: 'navigation',
      data () {
        return {

        }
      },
    methods: {
            onClick: function() {
            this.$root.$emit('toggle')
         }
    },

}
</script>
