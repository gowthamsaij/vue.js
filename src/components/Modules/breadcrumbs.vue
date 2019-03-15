
<template>
    <div class="breadcrumb" style="width:85%">
    <ul>
      <li
        v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        @click="routeTo(idx)"
        :class="{'linked': !!breadcrumb.link}" class="">

        {{ breadcrumb.name }}

      </li>
    </ul>
</div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      breadcrumbList: []
    }
  },
  mounted () { this.updateList() },
  watch: { '$route' () {
                this.updateList()
            }
    },
  methods: {
    routeTo (pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) this.$router.push(this.breadcrumbList[pRouteTo].link)
    },
    updateList () {
        this.breadcrumbList = this.$route.meta.breadcrumb
    }
  }
}
</script>

<style scoped>
    .breadcrumb {
    background-color: #ffffff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  list-style: none;
  /*background-color: #e9ecef;*/
  border-radius: 0.25rem;
  }
  ul {
    display: flex;
    justify-content: left;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  ul > li {
    display: flex;
    float: left;
    height: 10px;
    width: auto;
    color: $default;
    font-weight: bold;
    font-size: 1.2em;
    cursor: default;
    align-items: center;
  }
  ul > li:not(:last-child)::after {
    /*content: '/';*/
    float: right;
    font-size: .9em;
    margin: 0 .5em;
    color: $light-default;
    cursor: default;
  }
  .linked {
    cursor: pointer;
    font-size: 1em;
    font-weight: normal;
  }
  li + li:before {
  content: '\f061';
  display: inline-block;
  font-family: 'fontAwesome';
  padding: 0 10px;
}
</style>
