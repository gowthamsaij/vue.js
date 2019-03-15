<template>

</template>


<script>
export default {
  name: 'Logout',

    created() {
        localStorage.removeItem('user_access')
        this.$store.dispatch('removeToken')
        this.$router.push('/')

  }
}

</script>

