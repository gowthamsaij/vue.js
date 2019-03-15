<template>

  <div>
        <ul class="sidebar navbar-nav ">
            <li class="nav-item">
                <router-link  to="/" class="nav-link" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link  class="nav-link" to="/recurringupload" >
                <i class="fas fa-fw fa-folder"></i>
                <span>Recurring Upload</span>
                </router-link >
            </li>
            <li class="nav-item">
                <router-link  to="/recurringlist" class="nav-link">
                <i class="fas fa-fw fa-table"></i>
                <span>Uploaded List</span></router-link>
            </li>
        </ul>

</div>
</template>

<script>
export default {
  name: 'sidebarmenumerchant',
  data () {
    return {

    }
  }
}
</script>
