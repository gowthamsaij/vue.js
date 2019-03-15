<template>

  <div id="app" style="font-size: 14px;" class="wrapper">

    <div class="d-flex" id="wrapper" v-if="isLoggedIn" v-bind:style="{marginLeft : margin}">
        <div class="bg-light border-right" id="sidebar-wrapper">
            <div class="sidebar-heading">Recuring Payment</div>
                <div class="list-group list-group-flush" v-if="userAccessLevel == 'merchant'">
                        <sidebarmenumerchant/>
                </div>
                <div class="list-group list-group-flush" v-if="userAccessLevel == 'admin'">
                        <sidebarmenuadmin/>
                </div>
        </div>
    <!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper">
        <navigation/>
        <div class="container-fluid">
            <breadcrumbs />
            <router-view/>
        </div>
    </div>
    <!-- /#page-content-wrapper -->
  </div>
    <div v-if="!isLoggedIn">
        <router-view/>
    </div>
  </div>

</template>

<script>
require('@/assets/css/main.css')

import breadcrumbs from '../Modules/breadcrumbs'
import navigation from '../Modules/navigation'
import sidebarmenumerchant from '../Modules/sidebarmenumerchant'
import sidebarmenuadmin from '../Modules/sidebarmenuadmin'

export default {

    components: {
    breadcrumbs,
    navigation,
    sidebarmenumerchant,
    sidebarmenuadmin,
  },
    data() {
      return {
        margin : 'auto',
        show: false,
        widthactive : '84',
        floatactive :'right',
        sidebar : 'open',
        useraccess : '',
        breadcrumbList : [ ],
      }
    },
    name: 'Master',
    isLoggedIn : false,
    userAccessLevel : 'merchant',
    computed: {
        isLoggedIn: function() {
          return this.$store.getters.getUser
        },
        mechantId : function() {
            return this.$store.getters.mechantId
        },
        userAccessLevel : function() {
            return this.$store.getters.userAccess
        }

    },
    methods: {
        collapseSidebar(status) {
            if(status == 'open')
                this.margin = 'auto'
            else
                this.margin = '-15rem'
        },
        checkSidebar() {
            if(this.sidebar == 'close')
                this.sidebar = 'open'
            else
                this.sidebar = 'close'
            this.collapseSidebar(this.sidebar)
        },

    },
    mounted() {
        this.$root.$on('toggle', () => {
        this.checkSidebar()
            })
        }

}
</script>
<style >
.bg-light {
    background-color : #1c1919 !important;
}
.bg-light2 {
    background-color : #ededed !important;
    border-bottom : 1px solid #D9DEE4;
}
.list-view {
    color : #e5e5e5!important;
}
.sidebar-heading{
    color : #bcc6d1;
    border-bottom : 1px solid #dee2e6!important;
}
.list-group-item {
    color : #bcc6d1;
}
.nav-link .router-link-active {
    background-color: red;
}

</style>
