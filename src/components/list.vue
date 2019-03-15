<template>

  <div class="hello">
    <h1>{{ msg }}</h1>

    hello {{ $route.params.name }}

</div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
