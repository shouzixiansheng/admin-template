<template>
  <div class="tc" style="width:100%;height:100%">
    <img :src="require('@/assets/images/404.png')" width="90%" height="80%">
    <p class="mt15" style="color:#999999">对不起你访问的页面不存在</p>
    <span class="primary underline  ml20 pointer" @click="backHome">返回首页</span>
  </div>
</template>

<script>
export default {
  name: 'nomatch',
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  created() {

  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
